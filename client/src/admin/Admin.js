import React from 'react';
import { reducer as tree } from 'ra-tree-ui-materialui';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { Admin, Resource ,ListGuesser } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import defaultMessages from 'ra-language-english';
// your app components
import createAdminStore from '../createAdminStore';
import myDataProvider from './providers/myDataProvider';
import myAuthProvider from './providers/myAuthProvider';
import { LocaledTreeList, LocaledTreeListEdit, LocaledTreeListCreate } from './resources/LocaledTree';
import { LocalesList, LocalesListEdit, LocalesListCreate } from './resources/Locales';
import { AdminList, AdminCreate } from './resources/Admins';
import { UserList, UserEdit, UserCreate } from './resources/Users';
import { CustomEdit, CustomList, CustomCreate } from './resources/LocaledObject';
import { LanguagesList, LanguagesListEdit, LanguagesListCreate } from './resources/Languages';
import { TranslationsList, TranslationEdit, TranslationCreate } from './resources/Translations';
import { history } from "../config/history";
import customRoutes from './customRoutes';


// side effects
const authProvider = () => Promise.resolve();
const dataProvider = myDataProvider


const App = () => (
    <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            history,
        })}
    >
      <Admin customRoutes={customRoutes} history={history} dataProvider={myDataProvider} authProvider={myAuthProvider} customReducers={{ tree }}>
        <Resource options={{ label: 'Admins' }}  name="admins" list={AdminList} create={AdminCreate}  />
        <Resource options={{ label: 'System Languages' }} name="locales" list={LocalesList} edit={LocalesListEdit} create={LocalesListCreate}  />
        <Resource options={{ label: 'Users' }} name="users" list={UserList} edit={UserEdit} create={UserCreate}  />
        <Resource options={{ label: 'Specialities' }} name="specialities" list={LocaledTreeList} edit={LocaledTreeListEdit} create={LocaledTreeListCreate}  />
        <Resource options={{ label: 'Titles' }} name="titles" list={CustomList} edit={CustomEdit} create={CustomCreate}  />
        <Resource options={{ label: 'Degrees' }} name="degrees" list={CustomList} edit={CustomEdit} create={CustomCreate}  />
        <Resource options={{ label: 'HMOs' }} name="hmos" list={CustomList} edit={CustomEdit} create={CustomCreate}  />
        <Resource options={{ label: 'Translations' }} name="translations" list={TranslationsList} edit={TranslationEdit} create={TranslationCreate} />
        <Resource options={{ label: 'Languages' }} name="languages" list={LanguagesList} edit={LanguagesListEdit}  create={LanguagesListCreate}/>  
        <Resource options={{ label: 'Visits' }} name="visits" list={ListGuesser} />    
      </Admin>
    </Provider>
);

export default App;