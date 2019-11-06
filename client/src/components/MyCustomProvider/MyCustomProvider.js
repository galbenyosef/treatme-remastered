import React, { Fragment } from 'react';
import { LoadingDialog } from '../Dialogs/LoadingDialog';
import { DirectionProvider } from '../Utilities/languageUtils';
import { Alert } from '../Alert/Alert';

export const MyCustomProvdier = (props) => {

  return (
    <Fragment {...props}>
      <DirectionProvider>
        <LoadingDialog>
          <Alert/>
          {
            props.children
          }
        </LoadingDialog>
      </DirectionProvider>
    </Fragment>
  )
}