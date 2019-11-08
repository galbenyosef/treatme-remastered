import React from 'react'
import {
  List,
  Datagrid,
  EmailField,
  ReferenceField,
  TextField,
  TextInput,
  Create,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  SimpleForm,
  ChipField
} from 'react-admin';

export const AdminList = props => (
  <List {...props}>
      <Datagrid rowClick="edit">
          <ReferenceField label ="username" source="id" reference="users">
            <TextField source="username"/>
          </ReferenceField>
          <ReferenceField label ="email" source="id" reference="users">
            <TextField source="email"/>
          </ReferenceField>
      </Datagrid>
  </List>
);

export const AdminCreate = props => (
  <Create {...props}>
      <SimpleForm>
        <ReferenceInput label="username" source="id" reference="users">
          <AutocompleteInput
              optionText={choice =>
                  `${choice.username}`
              }
          />
        </ReferenceInput>
      </SimpleForm>
  </Create>
);