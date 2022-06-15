import React from 'react';
import { Box, Button, Flex, Link, Text, Image, Spacer } from '@chakra-ui/react';


const TeamInfo = () => {
    
    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">Our Team</Text>
                    <Spacer />
                    <Text fontSize="32px" textShadow="0 5px #000000">We are currently 4 👦.</Text>
                    <Spacer />
                    <Text fontSize="40px" textShadow="0 5px #000000">Divya Preetha</Text>
                    <Image src={Facebook} boxSize="42px" margin="0 15px"></Image>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >He is a Motoko top-star, he has been in the developer discord for a long time and he is among the best developers of this community.

                        He has been contributing a lot to different projects (NFTs, Motoko library…) through Aviate labs
                    </Text> 
                    <Spacer />

                    <Text fontSize="40px" textShadow="0 5px #000000">Maria</Text>
                    <Image src={Facebook} boxSize="42px" margin="0 15px"></Image>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >He is a Motoko top-star, he has been in the developer discord for a long time and he is among the best developers of this community.

                        He has been contributing a lot to different projects (NFTs, Motoko library…) through Aviate labs
                    </Text>
                    <Spacer />

                    <Text fontSize="40px" textShadow="0 5px #000000">Jo-Ann Hamilton</Text>
                    <Image src={Facebook} boxSize="42px" margin="0 15px"></Image>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >(me) a not-so experienced developer, I recently jumped into the development world when I fell in love with the Web3 Ecosystem a few months ago.
                    </Text>
                    <Spacer />

                    <Text fontSize="40px" textShadow="0 5px #000000">Silvia Margarita Oceangudea</Text>
                    <Image src={Facebook} boxSize="42px" margin="0 15px"></Image>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >He is a Motoko top-star, he has been in the developer discord for a long time and he is among the best developers of this community.

                        He has been contributing a lot to different projects (NFTs, Motoko library…) through Aviate labs
                    </Text>
                    <Spacer />


                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >Join us on 
                        <Link href="www.discord.com">Discord</Link>
                    </Text>
                    <Spacer />
                </div>
                
            </Box>
        </Flex>
    );
};

export default TeamInfo;
