import React, { useState, useMemo } from 'react';
import { useDataFetching } from '../../redux/hooks/useDataFetching';
import { Table, Input } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Spin } from 'antd'; 
import { GiLaptop } from "react-icons/gi";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface LaptopType {
  key: React.Key;
  laptopID: string;
  laptopName: string;
  toolNumber: string;
  purchaseCode: string;
  brandName: string;
  modelName: string;
  categoryName: string;
  stateName: string;
  userName: string;
}

const LaptopsTable: React.FC = () => {
  const { laptops, laptopStatus } = useDataFetching();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<LaptopType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const filteredData = laptops.filter(laptop =>
    Object.values(laptop).some(value =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const data: LaptopType[] = filteredData.map(laptop => ({
    key: laptop.laptopID,
    laptopID: laptop.laptopID,
    laptopName: laptop.laptopName,
    toolNumber: laptop.toolNumber,
    purchaseCode: laptop.purchaseCode,
    brandName: laptop.brandName,
    modelName: laptop.modelName,
    categoryName: laptop.categoryName,
    stateName: laptop.stateName,
    userName: laptop.userName,
  }));

  const columns: TableColumnsType<LaptopType> = useMemo(() => {
    const uniqueValues = (key: keyof LaptopType) => {
      return Array.from(new Set(data.map(item => item[key]))).map(value => ({
        text: String(value),
        value: String(value),
      }));
    };

    return [
      {
        title: 'Laptop ID',
        dataIndex: 'laptopID',
        filters: uniqueValues('laptopID'),
        onFilter: (value, record) => record.laptopID.includes(value as string),
      },
      {
        title: 'Laptop Name',
        dataIndex: 'laptopName',
        filters: uniqueValues('laptopName'),
        onFilter: (value, record) => record.laptopName.includes(value as string),
      },
      {
        title: 'Tool Number',
        dataIndex: 'toolNumber',
      },
      {
        title: 'Purchase Code',
        dataIndex: 'purchaseCode',
      },
      {
        title: 'Brand',
        dataIndex: 'brandName',
        filters: uniqueValues('brandName'),
        onFilter: (value, record) => record.brandName.includes(value as string),
      },
      {
        title: 'Model',
        dataIndex: 'modelName',
        filters: uniqueValues('modelName'),
        onFilter: (value, record) => record.modelName.includes(value as string),
      },
      {
        title: 'Category',
        dataIndex: 'categoryName',
        filters: uniqueValues('categoryName'),
        onFilter: (value, record) => record.categoryName.includes(value as string),
      },
      {
        title: 'State',
        dataIndex: 'stateName',
        filters: uniqueValues('stateName'),
        onFilter: (value, record) => record.stateName.includes(value as string),
      },
      {
        title: 'User',
        dataIndex: 'userName',
        filters: uniqueValues('userName'),
        onFilter: (value, record) => record.userName.includes(value as string),
      },
    ];
  }, [data]);

  if (laptopStatus === 'loading') return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <Spin size="large" />
    </div>
  );
  if (laptopStatus === 'failed') return <div>Error loading laptops</div>;

  return (
    <div className='bg-white shadow-md my-4 rounded-2xl p-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12'>
      <h2 className='flex items-center mb-4'><GiLaptop size={36} style={{color:'#2da5eb'}}/><h2 className='text-xl ml-3 sm:text-xl text-[#2da5eb] font-semibold'>Laptops</h2></h2>
      <div>
        <span>Total: {laptops.length}</span>
      </div>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className='mb-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3'
      />
      <div className='overflow-x-auto'>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          className='min-w-full'
        />
      </div>
    </div>
  );
};

export default LaptopsTable;
