// import './styles/index.scss';

// import { useEffect, useState } from 'react';

// import TableEmpty from '@/components/empty/table';
// import { Localize } from '@/context/languages';
// import { Helper } from '@/utils/Helper';

// import DropdownRoot from '../dropdown';
// import LoadingTable from '../loader/table';
// import { Loading } from '../loading';
// import Pagination from '../pagination';
// import CellTable from './cell';
// import {
//   type IGridColumn,
//   type IItemSort,
//   type IPagination,
//   type IPagingState,
//   type ITableRoot,
//   itemsPerPage,
// } from './types';

// function TableRoot({
//   componentEmpty = TableEmpty,
//   pangingTable = {
//     page: true,
//     take: true,
//   },
//   whiteHeader = false,
//   shadowTable = true,
//   onPagination,
//   keyReset,
//   ...props
// }: ITableRoot<any>) {
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   const EmptyComponent = componentEmpty;
//   const [paging, setPaging] = useState<IPagingState>({
//     page: 0,
//     take: itemsPerPage[0],
//   });
//   const [sort, setSort] = useState<IItemSort[]>(props?.sort && props.sort?.length > 0 ? props.sort : []);
//   useEffect(() => {
//     if (keyReset) {
//       setPaging({
//         page: 0,
//         take: itemsPerPage[0],
//       });
//     }
//   }, [keyReset]);
//   const handleChangeTake = (take: IOption) => {
//     setPaging(prev => ({ take, page: 0 }));
//     handleChangePage(1);
//   };

//   const handleChangePage = (page: number) => {
//     setPaging(prev => ({ ...prev, page: (page - 1) * Number(paging.take.value) }));
//   };

//   useEffect(() => {
//     const payload: IPagination = {
//       page: paging.page,
//       take: Number(paging.take.value),
//     };
//     if (onPagination) {
//       onPagination(payload);
//     }
//   }, [paging.page, paging.take.value]);

//   const handleSort = (item: IGridColumn<any>) => {
//     const index = sort.findIndex(i => i.field === item.field);
//     const sortList: IItemSort[] = [...sort].map(i => {
//       const isTargetCurrent = i.field === item.field;
//       if (isTargetCurrent) {
//         return i;
//       }
//       return {
//         field: i.field,
//         by: '',
//       };
//     });
//     const order = sortList[index].field;
//     let by = sortList[index].by;
//     switch (by) {
//       case 'asc': {
//         sortList[index].by = '';
//         by = '';
//         break;
//       }
//       case 'desc': {
//         sortList[index].by = 'asc';
//         by = 'asc';
//         break;
//       }
//       default: {
//         sortList[index].by = 'desc';
//         by = 'desc';
//         break;
//       }
//     }
//     props.onSort && props.onSort({ by, order });
//     setSort(sortList);
//   };
//   return (
//     <>
//       <div className={` ${props.className}`}>
//         <table className={`w-full rounded ${shadowTable && !Helper.isEmpty(props.data) && 'shadow-table'}`}>
//           <thead>
//             <tr className={`${whiteHeader ? 'border-b-neutral-40 border-b bg-white' : 'bg-neutral-30'} `}>
//               {props.gridColumn.map((item, index) => {
//                 return (
//                   item.cellHeader ?? (
//                     <td
//                       className={`px-6 py-4 ${item.className} ${sort && ' !cursor-pointer'}`}
//                       key={item.title + index.toString()}>
//                       <div
//                         onClick={() => {
//                           handleSort(item);
//                         }}
//                         className={`flex items-center gap-1 ${item.sort && 'cursor-pointer'} w-full justify-${item.align ?? 'start'}`}>
//                         <span className='text-neutral-80 select-none whitespace-nowrap text-base font-bold leading-5'>
//                           <Localize tid={item.title} />
//                         </span>
//                         {/* {handleExistSort(item) && handleRenderIconSort(handleItemSort(item))} */}
//                       </div>
//                     </td>
//                   )
//                 );
//               })}
//             </tr>
//           </thead>
//           <tbody className='bg-white'>
//             <Loading
//               componentLoading={
//                 <CellTable colSpan={props.checked ? props.gridColumn.length + 1 : props.gridColumn.length}>
//                   <LoadingTable />
//                 </CellTable>
//               }
//               isLoading={props.isLoading}>
//               {Helper.isEmpty(props.data) ? (
//                 <CellTable colSpan={props.checked ? props.gridColumn.length + 1 : props.gridColumn.length}>
//                   <EmptyComponent {...props.propsComponentEmpty} />
//                 </CellTable>
//               ) : (
//                 props?.data.map((item, index) => {
//                   return (
//                     <tr
//                       key={TableRoot.name + index.toString()}
//                       className={`border-b transition last:border-transparent  ${props.isHover && 'hover:bg-neutral-40'}`}>
//                       {props.gridColumn.map((col, indexCol) => {
//                         if (col.cell) {
//                           return (
//                             <td
//                               key={indexCol.toString() + index.toString() + col.field}
//                               onClick={() => {
//                                 props.onClickRow && props.onClickRow(item);
//                               }}
//                               className={`${!col.noGutter && 'px-4 py-3'}  ${props.onClickRow && 'cursor-pointer'} border text-base font-medium ${col.className}`}>
//                               {
//                                 // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
//                                 col.cell({
//                                   item,
//                                   ...col,
//                                   data: props.data,
//                                   index,
//                                 })
//                               }
//                             </td>
//                           );
//                         }
//                         return (
//                           <td
//                             key={indexCol.toString() + index.toString() + col.field}
//                             className={`${!col.noGutter && 'p-[18px]'} ${props.onClickRow && 'cursor-pointer'} ${col.countable && 'text-base font-medium'} ${col.className}`}>
//                             <div
//                               className={`flex items-center gap-1 ${item.sort && 'cursor-pointer'} w-full justify-${col.align ?? 'start'}`}>
//                               {col.countable
//                                 ? Number(paging.take.value) * Number(paging.page) + index + 1
//                                 : item[col.field]}
//                             </div>
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })
//               )}
//             </Loading>
//           </tbody>
//         </table>
//       </div>
//       {props.total > 0 && (pangingTable.page || pangingTable.take) && (
//         <div className='flex w-full  items-center justify-between px-6 pt-4'>
//           <div className='flex items-center'>
//             {pangingTable.take && (
//               <div className='flex items-center gap-[10px] text-14x18 font-medium text-[#333333]'>
//                 <span>
//                   <Localize tid={'show'} />
//                 </span>
//                 <DropdownRoot
//                   onSelect={() => {
//                     console.log(1);
//                   }}
//                 />
//                 <span>
//                   <Localize tid={'in'} />
//                   &nbsp;{props.total}&nbsp;
//                   <Localize tid={'record'} />
//                 </span>
//               </div>
//             )}
//           </div>
//           <div className='self-end'>
//             {pangingTable.page && (
//               <Pagination
//                 pageCurrent={paging.page / Number(paging.take.value) + 1}
//                 handleChangePage={handleChangePage}
//                 totalPage={Math.ceil(props.total / Number(paging.take.value))}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default TableRoot;
