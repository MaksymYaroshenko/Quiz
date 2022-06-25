import { Accordion, AccordionDetails, AccordionSummary, CardMedia, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { BASE_URL } from '../api';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { green, red, grey } from '@mui/material/colors';

function Answer({ questionAnswers }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const markCorrectOrNot = (question, index) => {
        if ([question.answer, question.selected].includes(index)) {
            return { sx: { color: question.answer == index ? green[500] : red[500] } }
        }
    }

    return (
        <Box sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
            {
                questionAnswers.map((item, index) => (<Accordion
                    disableGutters
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                >
                    <AccordionSummary expandIcon={<ExpandCircleDownIcon
                        sx={{
                            color: item.answer == item.selected ? green[500] : red[500]
                        }}
                    />}>
                        <Typography sx={{ width: '90%', flexShrink: 0 }}>
                            {item.questionName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: grey[900] }}>
                        {item.questionImage != null ?
                            <CardMedia component="img"
                                image={BASE_URL + 'images/' + item.questionImage}
                                sx={{ width: 'auto', m: '10px auto' }} />
                            :
                            null}
                        <List>
                            {item.options.map((x, ind) =>
                                <ListItem key={ind}>
                                    <Typography {...markCorrectOrNot(item, ind)}>
                                        <b>{String.fromCharCode(65 + ind) + ". "}</b> {x}
                                    </Typography>
                                </ListItem>
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>))
            }
        </Box>
    )

}

export default Answer