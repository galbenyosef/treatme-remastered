import React from 'react';

import {
    List,
    Datagrid,
    DateField,
    TextField,
    TextInput,
    Edit,
    Create,
    SimpleForm
} from 'react-admin';
/* import BookIcon from '@material-ui/core/svg-icons/action/book';
export const PostIcon = BookIcon; */

export const LanguagesList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">            
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="symbol" />
            <DateField source="created" />
        </Datagrid>
    </List>
);

export const LanguagesListEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="symbol" />
        </SimpleForm>
    </Edit>
);

export const LanguagesListCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="symbol" />
        </SimpleForm>
    </Create>
);
