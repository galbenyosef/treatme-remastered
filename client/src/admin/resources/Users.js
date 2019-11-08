import React from 'react';

import {
    List,
    Datagrid,
    EmailField,
    ReferenceArrayField,
    ReferenceArrayInput,
    SelectArrayInput,
    ArrayField,
    SimpleShowLayout,
    Show,
    Create,
    Edit,
    SimpleForm,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    TextInput,
    ReferenceField,
    BooleanInput,
    DateInput,
    TextField,
    Filter,
    ReferenceInput,
    AutocompleteInput,
} from 'react-admin';


export const UserCreate = props => (
  <Create {...props}>
      <SimpleForm>
      
          <TextInput source="username" />
          <TextInput source="email" />
          <ArrayInput source="firstname">
            <SimpleFormIterator>
              <ReferenceInput label="Locale" source="localeId" reference="locales">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <TextInput source="value" />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="lastname">
            <SimpleFormIterator>
            < ReferenceInput label="Locale" source="localeId" reference="locales">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <TextInput source="value" />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="jobTitle">
            <SimpleFormIterator>
              <ReferenceInput label="Locale" source="localeId" reference="locales">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <TextInput source="value" />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="languages">
            <SimpleFormIterator>
              <ReferenceInput label="Language" source="language" reference="languages">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <BooleanInput source="speaking" />
              <BooleanInput source="reading" />
              <BooleanInput source="writing" />
            </SimpleFormIterator>
          </ArrayInput>       
          <TextInput source="mobile" />
          <ReferenceArrayInput label="Titles" source="title" reference="titles">
            <SelectArrayInput optionText={<LocalesField/>}/>
          </ReferenceArrayInput>
          <ReferenceArrayInput label="Speciality" source="speciality" reference="specialities">
            <SelectArrayInput optionText={<LocalesField/>}/>
          </ReferenceArrayInput>
          <ReferenceArrayInput label="Specialities" source="specialities" reference="specialities">
            <SelectArrayInput optionText={<LocalesField/>}/>
          </ReferenceArrayInput>
          <ArrayInput source="about">
            <SimpleFormIterator>
              <ReferenceInput label="Locale" source="localeId" reference="locales">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <TextInput source="value" />
            </SimpleFormIterator>
          </ArrayInput>
          <DateInput source="createdDate" />
      </SimpleForm>
  </Create>
);

const UserListFilter = (props) => (
  <Filter {...props}>
      <ReferenceInput source="username" reference="users" alwaysOn>
      <AutocompleteInput
          optionText={choice =>{
              console.log(choice)
              return(`${choice.username} ${choice.username}`)
          }}
      />
      </ReferenceInput>
  </Filter>
)

const LocalesField = ({ record }) => 
  <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
    {
      record && record.locales.map((locale,idx) => 
        <div key={idx}>
        <span>{`${locale.language}: ${locale.value}`}</span>
        </div>
      )
    }
  </div>;

export const UserEdit = props => (
  <Edit {...props}>
      <SimpleForm>
      
          <TextInput source="username" />
          <TextInput source="email" />
          <ArrayInput source="firstname">
            <SimpleFormIterator>
              <ReferenceInput label="Locale" source="localeId" reference="locales">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <TextInput source="value" />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="lastname">
            <SimpleFormIterator>
              <ReferenceInput label="Locale" source="localeId" reference="locales">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <TextInput source="value" />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="jobTitle">
            <SimpleFormIterator>
              <ReferenceInput label="Locale" source="localeId" reference="locales">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <TextInput source="value" />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="languages">
            <SimpleFormIterator>
              <ReferenceInput label="Language" source="language" reference="languages">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <BooleanInput source="speaking" />
              <BooleanInput source="reading" />
              <BooleanInput source="writing" />
            </SimpleFormIterator>
          </ArrayInput>       
          <TextInput source="mobile" />
          <ReferenceArrayInput label="Titles" source="title" reference="titles">
            <SelectArrayInput optionText={<LocalesField/>}/>
          </ReferenceArrayInput>
          <ReferenceArrayInput label="Speciality" source="speciality" reference="specialities">
            <SelectArrayInput optionText={<LocalesField/>}/>
          </ReferenceArrayInput>
          <ReferenceArrayInput label="Specialities" source="specialities" reference="specialities">
            <SelectArrayInput optionText={<LocalesField/>}/>
          </ReferenceArrayInput>
          <ArrayInput source="about">
            <SimpleFormIterator>
              <ReferenceInput label="Locale" source="localeId" reference="locales">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <TextInput source="value" />
            </SimpleFormIterator>
          </ArrayInput>
          <DateInput source="createdDate" />
      </SimpleForm>
  </Edit>
);

export const UserShow = (props) => (
  <Show {...props} style={{backgroundColor:'blue'}}>
    <SimpleShowLayout>
      <ArrayField style={{margin:'0px 20px',flexDirection:'column'}} source="jobTitle">
        <Datagrid> 
          <ReferenceField label="Locale" source="localeId" reference="locales">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="value" />
        </Datagrid>
      </ArrayField>
      <ArrayField style={{margin:'0px 20px',flexDirection:'column'}} source="about">
        <Datagrid> 
          <ReferenceField label="Locale" source="localeId" reference="locales">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="value" />
        </Datagrid>
      </ArrayField>
      <ReferenceArrayField label="Main Speciality" source="speciality" reference="specialities">
        <Datagrid>
          <ArrayField label='' source="locales">
            <Datagrid>
              <ReferenceField label="Locale" source="localeId" reference="locales">
                <TextField source="name" />
              </ReferenceField>
              <TextField source="value" />
            </Datagrid>
          </ArrayField>  
        </Datagrid>
      </ReferenceArrayField>
      <ReferenceArrayField label="Specialities" source="specialities" reference="specialities">
        <Datagrid>
          <ArrayField label='' source="locales">
            <Datagrid>
              <ReferenceField label="Locale" source="localeId" reference="locales">
                <TextField source="name" />
              </ReferenceField>
              <TextField source="value" />
            </Datagrid>
          </ArrayField>  
        </Datagrid>
      </ReferenceArrayField>
      <ReferenceArrayField label="Titles" source="title" reference="titles">
        <Datagrid>
          <ArrayField label='' source="locales">
            <Datagrid>
              <ReferenceField label="Locale" source="localeId" reference="locales">
                <TextField source="name" />
              </ReferenceField>
              <TextField source="value" />
            </Datagrid>
          </ArrayField>  
        </Datagrid>
      </ReferenceArrayField>
      <ArrayField label='Languages' source="languages">
        <Datagrid>
          <ReferenceField label="Language" source="language" reference="languages">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="speaking" />
          <TextField source="reading" />
          <TextField source="writing" />
        </Datagrid>
      </ArrayField>

      {/* <ArrayField source="certifications"><SingleFieldList><ChipField source="_id" /></SingleFieldList></ArrayField>
      <ArrayField source="locations"><SingleFieldList><ChipField source="_id" /></SingleFieldList></ArrayField>
      <DateField source="createdDate" />
      <TextField source="gender" />
      <BooleanField source="searchable" />
      <BooleanField source="active" />
      <BooleanField source="inactive" />
      <BooleanField source="deleted" />
      <BooleanField source="verified" />
      <NumberField source="forgotpassMailSent" />
      <TextField source="authorized" /> */}
    </SimpleShowLayout>
  </Show>
);

export const UserList = (props) => (
  <List {...props} filters={<UserListFilter/>}>
          <Datagrid rowClick="edit" expand={<UserShow />}>
          <TextField source="id" />
          <TextField source="username" />
          <EmailField source="email" />
          <ArrayField style={{margin:'0px 20px',flexDirection:'column'}} source="firstname">
            <Datagrid> 
              <ReferenceField label="Locale" source="localeId" reference="locales">
                <TextField source="name" />
              </ReferenceField>
              <TextField source="value" />
            </Datagrid>
          </ArrayField>
          <ArrayField style={{margin:'0px 20px',flexDirection:'column'}} source="lastname">
            <Datagrid>
              <ReferenceField label="Locale" source="localeId" reference="locales">
                <TextField source="name" />
              </ReferenceField>
              <TextField source="value" />
            </Datagrid>
          </ArrayField>         
          <TextField source="mobile" />


          
         {/*  
          <ArrayField source="certifications"><SingleFieldList><ChipField source="_id" /></SingleFieldList></ArrayField>
          <ArrayField source="locations"><SingleFieldList><ChipField source="_id" /></SingleFieldList></ArrayField>
          <DateField source="createdDate" />
          <LocaledTreeSingleField source="about" />
          <TextField source="gender" />
          <LocaledTreeSingleField source="jobTitle" />
          <BooleanField source="searchable" />
          <BooleanField source="active" />
          <BooleanField source="inactive" />
          <BooleanField source="deleted" />
          <BooleanField source="verified" />
          <BooleanField source="valid" />
          <NumberField source="forgotpassMailSent" />
          <TextField source="authorized" /> */}
      </Datagrid>
  </List>
);
