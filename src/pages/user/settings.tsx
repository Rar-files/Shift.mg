import type { NextPage } from 'next'
import {useAppSelector} from "../../app";
import {
    Box,
    Container,
    Divider,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import Loading from "../../components/Loading";
import styled from 'styled-components';

const SettingsDiv = styled.div`
    overflow: auto;
    height: 100vh;
`;

const Settings: NextPage = () => {

    const userState = useAppSelector(state => state.user)

    return (
        <main>
            <SettingsDiv>
                {(userState.loaded && userState.data)
                ?   <Container>
                        <Box marginTop={'20px'} marginBottom={'20px'}>
                            <Paper elevation={3}>
                                <Box padding={'20px'}>
                                    <Typography>Data</Typography>
                                </Box>
                                <Divider />
                                <Box padding={'20px'}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Name</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{userState.data.displayName}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Username</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{userState.data.username}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Box>
                    </Container>
                
                :   <Loading/>
                }
            
            </SettingsDiv>
        </main>
    )
}

export default Settings
