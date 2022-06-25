import { Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from "@mui/material";
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormatedTime } from "../helper";
import useStateContext, { stateContext } from "../hooks/useStateContext";

function Quiz() {

    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const { context, setContext } = useStateContext();
    const navigate = useNavigate();
    let timer;

    const startTimer = () => {
        timer = setInterval(() => {
            setTimeTaken(prev => prev + 1);
        }, [1000])
    }

    const updateAnswer = (queIndex, answerIndex) => {
        const temp = [...context.selectedOptions];
        temp.push({
            questionId: queIndex,
            selected: answerIndex
        });

        if (questionIndex < 4) {
            setContext({ selectedOptions: [...temp] });
            setQuestionIndex(questionIndex + 1);
        } else {
            setContext({ selectedOptions: [...temp], timeTaken });
            navigate("/result");
        }
    }

    useEffect(() => {
        setContext({
            timeTaken: 0,
            selectedOptions: []
        })

        createAPIEndpoint(ENDPOINTS.question)
            .fetch()
            .then(res => {
                setQuestions(res.data)
                startTimer()
            })
            .catch(error => console.log(error))

        return clearInterval(timer)
    }, [])

    return (
        questions.length != 0 ?
            <Card sx={{
                maxWidth: 640, mx: "auto", mt: 5,
                '& .MuiCardHeader-action': { m: 0, alihnSelf: "center" }
            }}>
                <CardHeader
                    title={"Question " + (questionIndex + 1) + " of 5"}
                    action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />
                <Box>
                    <LinearProgress variant="determinate" value={(questionIndex + 1) * 100 / 5} />
                </Box>
                <CardContent>
                    <Typography variant="h6">
                        {questions[questionIndex].questionName}
                    </Typography>
                    {questions[questionIndex].questionImage != null ?
                        <CardMedia component="img"
                            image={BASE_URL + 'images/' + questions[questionIndex].questionImage}
                            sx={{ width: 'auto', m: '10px auto' }} />
                        :
                        null
                    }
                    <List>
                        {questions[questionIndex].options.map((item, index) =>
                            <ListItemButton key={index} onClick={() => updateAnswer(questions[questionIndex].questionId, index)}>
                                <div>
                                    <b>{String.fromCharCode(65 + index) + ". "}</b> {item}
                                </div>
                            </ListItemButton>
                        )}
                    </List>
                </CardContent>
            </Card>
            :
            null
    )
}

export default Quiz