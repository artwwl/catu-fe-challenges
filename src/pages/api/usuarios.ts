import { NextApiRequest, NextApiResponse } from 'next';
import UserData from '@/pages/api/usuarios.json';

const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  let page: number = parseInt(`${query?.page}`);
  page = isNaN(page) ? 1 : page;

  let pageSize: number | null = parseInt(`${query?.page_size}`);
  pageSize = isNaN(pageSize) ? 10 : pageSize;

  let order: string | null = `${query?.order}`.toLowerCase();
  if (order !== 'asc' && order !== 'desc') order = 'asc';

  let orderBy: string | null = `${query?.order_by}`.toLowerCase();
  if (!!orderBy === false || orderBy === 'undefined') orderBy = 'id';

  let filterBy: string | null = `${query?.filter_by}`.toLowerCase();
  if (!!filterBy === false || filterBy === 'undefined') filterBy = null;

  let filterValue: string | null = `${query?.filter}`;
  if (!!filterValue === false || filterValue === 'undefined')
    filterValue = null;

  const sliceStart = (page - 1) * pageSize;
  const sliceEnd = sliceStart + pageSize;

  const userData = [...UserData]
    .sort((a: any, b: any) => {
      switch (orderBy) {
        case 'name':
        case 'surname':
        case 'birthday':
          return order === 'asc'
            ? a[`${orderBy}`] > b[`${orderBy}`]
              ? 1
              : -1
            : a[`${orderBy}`] > b[`${orderBy}`]
              ? -1
              : 1;
        case 'age':
          return order === 'asc' ? a.age - b.age : b.age - a.age;
        default:
          return order === 'asc' ? a.id - b.id : b.id - a.id;
      }
    })
    .filter((user: any) => {
      if (filterBy !== null && filterValue !== null) {
        switch (filterBy) {
          case 'name':
          case 'surname':
            return user[`${filterBy}`]
              .toLowerCase()
              .includes(`${filterValue}`.toLowerCase());
          case 'age':
            return user[`${filterBy}`] === parseInt(filterValue);
          default:
            return user[`${filterBy}`].includes(filterValue);
        }
      }

      return true;
    });

  const resultsData = userData.slice(sliceStart, sliceEnd);

  if (filterBy !== null && filterValue !== null && resultsData?.length === 0) {
    res.status(404).json({
      message: 'Nenhum resultado encontrado!',
      filter_by: filterBy,
      filter: filterValue
    });
    return;
  }

  res.status(200).json({
    results: resultsData,
    order_by: orderBy,
    order: order,
    filter_by: filterBy,
    filter: filterValue,
    total_results: userData.length
  });
};

export default requestHandler;
