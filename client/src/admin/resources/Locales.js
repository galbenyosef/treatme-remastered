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

export const LocalesList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">            
            <TextField source="name" />
            <TextField source="symbol" />
            <TextField source="direction" />
        </Datagrid>
    </List>
);

export const LocalesListEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="symbol" />
            <TextInput source="direction" />
        </SimpleForm>
    </Edit>
);

export const LocalesListCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="symbol" />
            <TextInput source="direction" />
        </SimpleForm>
    </Create>
);
