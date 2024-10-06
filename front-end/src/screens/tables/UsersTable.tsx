import React, { useState, useMemo } from 'react';
import { useDataFetching } from '../../redux/hooks/useDataFetching';
import { FaUsers } from 'react-icons/fa'; 
import { Table, Input } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Spin } from 'antd'; 
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  id: number;
  userName: string;
  userEmail: string;
  deptName: string;
  postName: string;
}

const UsersTable: React.FC = () => {
  const { users, userStatus } = useDataFetching();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
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

  const filteredData = users.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const data: DataType[] = filteredData.map(user => ({
    key: user.id,
    id: user.id,
    userName: user.userName,
    userEmail: user.userEmail,
    deptName: user.deptName,
    postName: user.postName,
  }));

  const columns: TableColumnsType<DataType> = useMemo(() => {
    const uniqueValues = (key: keyof DataType) => {
      return Array.from(new Set(data.map(item => item[key]))).map(value => ({
        text: String(value),
        value: String(value),
      }));
    };

    return [
      {
        title: 'ID',
        dataIndex: 'id',
        filters: uniqueValues('id'),
        onFilter: (value, record) => record.id === Number(value),
      },
      {
        title: 'Name',
        dataIndex: 'userName',
        filters: uniqueValues('userName'),
        onFilter: (value, record) => record.userName.includes(value as string),
      },
      {
        title: 'Email',
        dataIndex: 'userEmail',
      },
      {
        title: 'Department',
        dataIndex: 'deptName',
        filters: uniqueValues('deptName'),
        onFilter: (value, record) => record.deptName.includes(value as string),
      },
      {
        title: 'Position',
        dataIndex: 'postName',
        filters: uniqueValues('postName'),
        onFilter: (value, record) => record.postName.includes(value as string),
      },
    ];
  }, [data]);

  if (userStatus === 'loading') return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <Spin size="large" />
    </div>
  );
  if (userStatus === 'failed') return <div>Error loading users</div>;

  return (
    <div className='bg-white shadow-md my-4 rounded-2xl p-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12'>
      <h2 className='flex items-center mb-4'><FaUsers size={36} style={{color:'#ebae2d'}}/><h2 className='text-xl ml-3 sm:text-xl text-[#ebae2d] font-semibold'>Users</h2></h2>
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

export default UsersTable;
