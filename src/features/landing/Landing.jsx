import { Box, Heading, Button, Flex, Card, Text} from '@radix-ui/themes';
import { ArrowRightIcon, RocketIcon } from '@radix-ui/react-icons';
import './landing.css';
import img1 from '@/assets/badminton1.jpg';
import img2 from '@/assets/badminton2.jpg';
import img3 from '@/assets/frame1.png';
import { SerifHeading } from '@/components/SerifHeading';

export function Landing() {
  return (
    <Flex gap="9" pt="4" direction="column" align="center" justify="center">
      <Flex
        gap="6"
        direction={{ initial: 'column', xs: 'column', sm: 'row' }}
        align="center"
        justify="center"
        className="marge-container"
      >
        <Flex gap="4" direction="column">
          <SerifHeading size={{ initial: '1', xs: '8', md: '7' }}>
            <Text>Jouer</Text>. <Text color="cyan">Défouler</Text> . <br />{' '}
            <Text color="pink">Amuser</Text>. <Text color="purple">Ensemble</Text>.
          </SerifHeading>

          <Text size={{ initial: '4', xs: '5' }}>
            <Text as="p" mb="5" color="gray">
              Découvrez le badminton au sein de notre association sportive. Rejoignez-nous pour des des moments de jeu, d'entraînement et d'amusement sur le terrain. Tous les niveaux sont les bienvenus !
            </Text>
          </Text>
          <Flex gap="3" align="center">
            <Button asChild>
              <a href="/auth">
                Se connecter
                <RocketIcon style={{ opacity: 1, marginRight: -3 }} />
              </a>
            </Button>
            <Button asChild variant="soft">
              <a href="/discover">
                Découvrir
                <ArrowRightIcon style={{ opacity: 1, marginRight: -3 }} />
              </a>
            </Button>
          </Flex>
        </Flex>
        <Box>
          <img src={img1.src} alt="une image" style={{ width: 300 }} />
        </Box>
      </Flex>

      <Card className="marge-container" backgroundColor="blue">
        <Flex gap="3" align="center" direction="column" className="container-insta">
          <Heading size={{ initial: '1', xs: '4', md: '6' }}>ASUL Lannion</Heading>
          <Text size={{ initial: '3', xs: '3', md: '4' }}>
            <Text as="p" align="center">
            Suivez notre compte Instagram pour des photos, vidéos et actualités exclusives de notre association sportive. Cliquez maintenant pour rejoindre notre communauté virtuelle et rester connecté avec tout ce qui se passe sur et en dehors du terrain.
            </Text>
          </Text>
          <Button asChild>
              <a href="https://www.instagram.com/asulannion/">
                Découvrir
                <ArrowRightIcon style={{ opacity: 1, marginRight: -3 }} />
              </a>
            </Button>
        </Flex>
      </Card>

      <Flex
        gap="6"
        direction={{ initial: 'column', xs: 'column', sm: 'row' }}
        align="center"
        justify="center"
        className="marge-container"
      >
        <img src={img2.src} alt="une image" style={{ width: 300 }} />
        <Text size={{ initial: '3', xs: '3', md: '4' }}>
            <Text as="p" mb="5">
            Le badminton se joue sur un terrain rectangulaire avec un filet au milieu. Le but est de faire passer le volant par-dessus le filet de manière à ce qu'il atterrisse dans le camp adverse. Les joueurs marquent des points en respectant certaines règles. Le jeu se joue en sets, avec le premier joueur atteignant 13 points et une avance minimale de 2 points remporte le set. 
            </Text>
          </Text>
      </Flex>

      <Flex
        gap="6"
        direction={{ initial: 'column', xs: 'column', sm: 'row' }}
        align="center"
        justify="center"
        className="fond-container-dashboard"
      >
        <Flex gap="4" direction="column" align="start">
          <Heading color="blue" size={{ initial: '4', xs: '5', md: '7' }}>
            Tableau de bord
          </Heading>
          <Text size={{ initial: '3', xs: '3', md: '4' }}>
            <Text as="p" mb="5">
            Grâce à notre application de gestion des statistiques et des matchs, vous pouvez désormais suivre et analyser vos performances en temps réel. Que vous soyez un joueur débutant en quête d'amélioration ou un compétiteur chevronné, notre application simplifie la gestion de vos données tout en enrichissant votre expérience sur le terrain.
            </Text>
          </Text>
          <Button asChild>
              <a href="/dashboard">
                Accéder au tableau de bord
                <ArrowRightIcon style={{ opacity: 1, marginRight: -3 }} />
              </a>
            </Button>
        </Flex>
        <img src={img3.src} alt="une image" style={{ width: 300 }} />
      </Flex>
{/* 
      <Flex direction="column" align="center" className="marge-container">
        <Heading size={{ initial: '4', xs: '5', md: '7' }}>Tutorial</Heading>
        <Separator orientation="horizontal" size="3" />
      </Flex> */}
    </Flex>
  );
}
