import React from 'react';
import { TennisImage } from './assets/images/tennis.jpg';
import { Box, Button, Flex, Link, Text, Image, Spacer } from '@chakra-ui/react';


const AboutInfo = () => {
    
    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">About Us</Text>
                    <Spacer />
                    <Text fontSize="32px" textShadow="0 5px #000000">The leaderboard rewarding Tennis Players with NFTs</Text>
                    <Spacer />
                    
                    <Image src={TennisImage} boxSize="42px" margin="0 15px"></Image>
                    <Text fontSize="40px" textShadow="0 5px #000000">Our Mission: Reward the amateur tennis players with NFTs</Text>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >
                            The project is to create a mega-leaderboard that aggregates scores of each Tennis Player in this Season. Depending on the number of games you’ve played and the performance in each of those games, players will get rewarded with specials ranks and NFTs badges. A tournament will start when all the games have shown up and will last a week. This will be the time to show the world your player's skills.
                            
                    </Text> 
                    <Spacer />

                    <Text fontSize="40px" textShadow="0 5px #000000">How do we calculate scores? 🤔</Text>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >
                            Add Bullet Points
                            Add more points from Miro Board
                            Scores are normalized among trainings/tournaments hosted on each season; it means that each tournament and training match will have as much impact on your leaderboard score as the others.
                    </Text> 
                    <Spacer />

                    <Text fontSize="40px" textShadow="0 5px #000000">What are the rewards? 🥳</Text>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >
                            We have two types of rewards:

1) Transferable rewards 🎁

Big names in the IC ecosystem have accepted to sponsor us: we currently have a prize pool estimated at more than 100 ICP!

Earn Cronics, Starverse, ICmojis, IC-Puppies: all of them will be there.

We will release a detailed list of all the rewards soon before launch.

If you want to join our list of sponsors, you can contact me here.

2) Non-Transferable rewards 🏆

Based on your performance you will earn a “Rank badge” that will be yours forever, you will not be able to sell it or trade it, but it will grant you amazing credit in the community.

//Insert an image of the list of all NFTs

Those non-transferable badges will also grant access to multiples privileges:


• Vote for the future of the Metascore and decide on the rules for the next season. 👑

• Get access to special communications channels and open locked doors on the Internet Computer.  🔓

• More to come….

You really don’t want to miss those.
                    </Text> 
                    <Spacer />

                    <Text fontSize="40px" textShadow="0 5px #000000">Who is contributing to this project? 🤝</Text>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >
                           The project is a community project, if you want to come and give some help, you are welcome.

Here’s the Metascore organization: https://github.com/metascore
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

export default AboutInfo;
