import { Divider, Stack, Typography } from '@mui/material';
import Head from 'next/head';


export default function Home() {
  return (
    <>
      <Head>
        <title>Catu : Front End Exercises</title>
        <meta name="description" content="Vem codar, vem!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack direction={'column'} gap={2}>
        <Typography variant={'h3'}>Bem-vindo!</Typography>
        <Typography variant={'h5'}>
          Só navegar no menu ao lado, escolher o seu challenge e go go!
        </Typography>
        <Typography>
          Não vá com pressa ou sede ao pote, mas não seja estático também! Leia
          atentamente o código, os comentários e tudo mais que tiver a ver com o
          exercício!
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant={'caption'}>
          Dúvidas? Pergunte sem medo 🙋!
        </Typography>
        <Typography variant={'caption'}>
          Sugestões? Manda aí que somos todos ouvidos 🦻!
        </Typography>
        <Typography variant={'caption'}>Críticas? Manda ver 🤔!</Typography>
        <Typography variant={'caption'}>
          Elogios? Sinta-se à vontade 🤩!
        </Typography>
        <Typography variant={'caption'}>Nada? Então tá, né? 😅</Typography>
      </Stack>
    </>
  );
}
