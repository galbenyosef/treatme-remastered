import React from 'react';

import {
    ArrayInput,
    SimpleFormIterator,
    TextInput,
    TextField,
    Edit,
    SimpleForm,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    Datagrid,
    DateField,
    Create,
    ArrayField,
    BooleanInput,

} from 'react-admin';


export const CustomList = props => (
  <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <ArrayField source="locales">
          <Datagrid>
            <ReferenceField label="Locale" source="localeId" reference="locales">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="value" />
          </Datagrid>
        </ArrayField>
        <TextField source="by" />
        <TextField source="new" />
        <DateField source="created" />
      </Datagrid>
  </List>
);

export const CustomEdit = props => (
  <Edit {...props}>
      <SimpleForm>
        <ArrayInput source="locales">
          <SimpleFormIterator>
            <ReferenceInput label="Locale" source="localeId" reference="locales">
              <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="value" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="by" />
        <BooleanInput source="new" />
      </SimpleForm>
  </Edit>
);

export const CustomCreate = props => (
  <Create {...props}>
      <SimpleForm>
        <ArrayInput source="locales">
          <SimpleFormIterator>
            <ReferenceInput label="Locale" source="localeId" reference="locales">
              <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="value" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="by" />
        <BooleanInput source="new" />
      </SimpleForm>
  </Create>
);