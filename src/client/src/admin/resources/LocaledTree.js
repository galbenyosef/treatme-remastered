import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {
  DeleteButton,
  List,
  ArrayInput,
  SimpleFormIterator,
  ArrayField,
  DateField,
  TextField,
  EditButton,
  ReferenceInput,
  SimpleList,
  TextInput,
  Edit,
  SelectInput,
  ReferenceField,
  Datagrid,
  Create,
  SimpleForm
} from 'react-admin';
/* import BookIcon from '@material-ui/core/svg-icons/action/book';
export const PostIcon = BookIcon; */
import { Tree, NodeView, NodeActions } from 'ra-tree-ui-materialui';

const LocaledTreeActions = props => (
  <NodeActions {...props}>
    <EditButton />
    <DeleteButton />
  </NodeActions>
);


export const LocaledTreeListEdit = props => (
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
    </SimpleForm>
  </Edit>
);


export const LocaledTreeListCreate = props => (
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
    </SimpleForm>
  </Create>
);

export const LocaledTreeSingleField = ({ source, record = {} }) => 
  <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
    <p>
      {`${record.language}: ${record.value}`}
    </p>
  </div>




const exporter = (records, fetchRelatedRecords) => {
  console.log(records)
  /* fetchRelatedRecords(records, 'post_id', 'posts').then(posts => {
      const data = records.map(record => ({
              ...record,
              post_title: posts[record.post_id].title,
      }));
      const csv = convertToCSV({
          data,
          fields: ['id', 'post_id', 'post_title', 'body'],
      });
      downloadCSV(csv, 'comments');
  }); */
};


export const LocaledTreeList = (props) => 
  <List {...props} exporter={false}>
    <Tree allowDropOnRoot enableDragAndDrop>
      <NodeView actions={<LocaledTreeActions/>}>
        <ArrayField source="locales">
          <Datagrid>
    {/*         <ReferenceField  label="Locale" source="localeId" reference="locales" >
              <TextField source="symbol" />
            </ReferenceField> */}
            <TextField source="value" />
          </Datagrid>
        </ArrayField>
        <TextField style={{margin:'0px 20px'}} source="by" />
        <DateField style={{margin:'0px 20px'}} source="created" />
      </NodeView>
    </Tree>
  </List>




