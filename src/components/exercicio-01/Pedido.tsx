import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from "./Pedido.module.scss";
import ReplayIcon from '@mui/icons-material/Replay';

interface PedidoData {
  dish: string;
  servings: number;
  message: string;
  extras: string[];
}

const Pedido = () => {
  const [pedido, setPedido] = useState<PedidoData | null>(null);

  const delayTimer = 500;
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function fetchPedido() {
    setPedido(null);

    const url = '/api/pedido';

    fetch(url)
      .then((res) => res.json())
      .then(async (data) => {
        await delay(delayTimer); // Simula um delay de 500ms, não entraria numa aplicação real.
        setPedido(data);
      })
  }

  useEffect(() => {
    fetchPedido();
  }, []);

  if (!pedido) {
    return (
      <Typography variant={"h5"}>Carregando pedido...</Typography>
    );
  }

  if (pedido.message) {
    return (
      <>
        <Typography variant={"h5"}>{pedido.message}</Typography>
        <button className={styles.button} onClick={fetchPedido}>
          <ReplayIcon sx={{ fontSize: 16 }} />
          <Typography>Tentar novamente</Typography>
        </button>
      </>
    );
  }

  return (
    <Stack gap={2}>
      <Typography variant={'h5'}
        sx={{ fontSize: 14 }}
        fontWeight={'700'}
      >
        Pedido: <Typography sx={{ fontSize: 20 }}>{pedido?.dish}</Typography>
      </Typography>

      <Typography variant={'h6'}
        sx={{ fontSize: 14 }}
        fontWeight={'700'}
      >
        Porções: <Typography sx={{ fontSize: 20 }}>{pedido?.servings}</Typography>
      </Typography>

      <Typography variant={'h6'}
        sx={{ fontSize: 14 }}
        fontWeight={'700'}
      >
        Extras:
        {pedido.extras ? (
          <ul className={styles.list}>
            {pedido.extras.map((extra, index) => (
              <li key={index}><Typography sx={{ fontSize: 20 }}>{extra}</Typography></li>
            ))}
          </ul>
        ) : (
          <Typography sx={{ fontSize: 20 }}>Sem extras</Typography>
        )}
      </Typography>
    </Stack>
  );
};

export default Pedido;
