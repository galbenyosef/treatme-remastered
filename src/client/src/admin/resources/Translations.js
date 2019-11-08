import React from 'react';

import {
    ArrayInput,
    SimpleFormIterator,
    TextInput,
    TextField,
    Edit,
    SimpleForm,
    List,
    Datagrid,
    ReferenceField,
    Create,
    ReferenceInput,
    SelectInput,
    ArrayField,

} from 'react-admin';


export const TranslationsList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="page" />
      <TextField source="source" />
      <ArrayField source="locales">
        <Datagrid>
          <ReferenceField  label="Locale" source="localeId" reference="locales" >
            <TextField source="symbol" />
          </ReferenceField>
          <TextField source="value" />
        </Datagrid>
      </ArrayField>
    </Datagrid>
  </List>
);

export const TranslationEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="page" />
      <TextInput source="source" />
      <ArrayInput source="locales">
        <SimpleFormIterator>
          <ReferenceInput label="Locale" source="localeId" reference="locales">
            <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="value" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const TranslationCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="page" />
      <TextInput source="source" />
      <ArrayInput source="locales">
        <SimpleFormIterator>
          <ReferenceInput label="Locale" source="localeId" reference="locales">
            <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="value" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);