import { Chip, FormControl, Grid, InputLabel, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import DataTable, { DataTableColumn } from '../elements/DataTable';
import {
  TransgenderTwoTone,
  MaleTwoTone,
  FemaleTwoTone
} from '@mui/icons-material';
import styles from "./Usuarios.module.scss";
import Form from './Form';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Array<any>>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [query, setQuery] = useState<any>({});
  const [currentSortableName, setCurrentSortableName] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(NaN);
  const [maxPageSize, setMaxPageSize] = useState<number>(NaN);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const parsedValue = parseInt(value);

    if (!(value === '' || isNaN(parsedValue) || parsedValue < 1 || parsedValue > maxPageSize)) {
      setPageSize(() => {
        setQuery((prevQuery: any) => ({
          ...prevQuery,
          page: 1,
          'page_size': parsedValue
        }));
        return parsedValue;
      });
    } else {
      setPageSize(() => {
        setQuery((prevQuery: any) => ({
          ...prevQuery,
          page: 1,
          'page_size': maxPageSize
        }));
        return maxPageSize;
      });

      event.target.value = '1';
    }
  }

  function nextPage() {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      setQuery((prevQuery: any) => ({
        ...prevQuery,
        page: newPage
      }));
      return newPage;
    });
  }

  function handleFormSubmit(filterValue: string, filterBy: string) {
    setPage(1);
    setQuery((prevQuery: any) => ({
      ...prevQuery,
      page: 1,
      'filter_by': filterBy,
      'filter': filterValue
    }));
  }

  function previousPage() {
    setPage((prevPage) => {
      const newPage = prevPage - 1;
      setQuery((prevQuery: any) => ({
        ...prevQuery,
        page: newPage
      }));
      return newPage;
    });
  }

  function handleSort(sortableName: string | undefined) {
    let order = 'asc';
    if (sortableName === currentSortableName)
      order = query?.order === 'asc' ? 'desc' : 'asc';

    setCurrentSortableName(sortableName);

    setQuery((prevQuery: any) => {
      return {
        ...prevQuery,
        ["order_by"]: sortableName,
        ["order"]: order
      };
    });
  }

  function stringifyObject(obj: Record<string, string>): string {
    return Object.entries(obj)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  function fetchUsuarios(params?: string) {
    const baseUrl = '/api/usuarios';
    const fullUrl = params ? `${baseUrl}?${params}` : baseUrl;

    fetch(fullUrl)
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data?.results || [])


        const currentMaxPage = !isNaN(parseInt(data.total_results)) ? Math.ceil(data.total_results / pageSize) : 1;
        setMaxPage(currentMaxPage);
        setMaxPageSize(data.total_results);
      });
  }

  useEffect(() => {
    const stringQuery = stringifyObject(query);
    fetchUsuarios(stringQuery);
  }, [query, page]);

  const columns: Array<DataTableColumn> = [
    {
      title: 'ID',
      render: (data) => <Typography>{data.id}</Typography>,
      sortable: true,
      sortableName: 'id',
      config: {
        width: 80,
        align: 'center'
      }
    },
    {
      title: 'Nome',
      render: (data) => <Typography>{data.name}</Typography>,
      sortable: true,
      sortableName: 'name',
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'Sobrenome',
      render: (data) => <Typography>{data.surname}</Typography>,
      sortable: true,
      sortableName: 'surname',
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'Idade',
      render: (data) => <Typography>{data.age}</Typography>,
      sortable: true,
      sortableName: 'age',
      config: {
        width: 80,
        align: 'center'
      }
    },
    {
      title: 'Nascimento',
      render: (data) => {
        const date = new Date(data.birthday);

        return (
          <Typography>
            {date.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </Typography>
        );
      },
      sortable: true,
      sortableName: 'birthday',
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'E-mail',
      render: (data) => (
        <Typography>
          <Chip label={data.email} />
        </Typography>
      ),
      config: {
        width: 240,
        align: 'center'
      }
    },
    {
      title: 'Telefone',
      render: (data) => (
        <Typography>
          <Chip label={data.phone} />
        </Typography>
      ),
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'Gênero',
      render: (data) => {
        if (data?.gender === 'male') {
          return (
            <Typography>
              <Chip label={<MaleTwoTone />} />
            </Typography>
          );
        }

        if (data?.gender === 'female') {
          return (
            <Typography>
              <Chip label={<FemaleTwoTone />} />
            </Typography>
          );
        }

        return (
          <Typography>
            <Chip label={<TransgenderTwoTone />} />
          </Typography>
        );
      },
      config: {
        width: 80,
        align: 'center'
      }
    }
  ];

  return (
    <>
      <Form onSubmit={handleFormSubmit} />
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ overflowX: 'auto' }}>
          {usuarios?.length === 0 && <Typography>Nenhum usuário</Typography>}
          {usuarios?.length > 0 && (
            <DataTable
              tableProps={{ size: 'small' }}
              sx={{ width: 'max-content' }}
              columns={columns}
              data={usuarios}
              onSort={(sortableName) => handleSort(sortableName)}
              sortBy={'id'}
              sortOrder={'asc'}
            />
          )}
        </Grid>
      </Grid>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={previousPage}
          disabled={page === 1}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }}></ArrowBackIcon>
        </button>

        <p>Página: {page}/{maxPage}</p>
        <button
          className={styles.button}
          onClick={nextPage}
          disabled={page === maxPage}
        >
          <ArrowForwardIcon sx={{ fontSize: 18 }}></ArrowForwardIcon>
        </button>

        <FormControl sx={{ minWidth: 200 }}>
          <TextField
            label="Itens por página"
            type="number"
            inputProps={{
              min: 1,
              max: maxPageSize,
              step: 1,
            }}
            value={pageSize}
            onChange={handleChange}
          />
        </FormControl>
      </div>
    </>
  );
};

export default Usuarios;
