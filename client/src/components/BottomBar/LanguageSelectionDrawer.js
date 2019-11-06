import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { getTranslations } from '../../actions/localeActions';
import { TOGGLE_LOCALIZATION_BAR } from '../../actions/constants';

class LanguageSelectionDrawer extends React.Component {

  render() {

    const {barOpened,locales,toggleDrawer,locale,getTranslations} = this.props

    if (!locales.length)
      return null
    return (
        <Drawer disableBackdropClick={!locale} disableEscapeKeyDown={!locale} PaperProps={{style:{maxWidth:'500px',margin:'auto'}}} anchor="bottom" open={barOpened} onClose={toggleDrawer}>
          <div tabIndex={0} role="button" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>
            {
              locales.map(
                (_locale, index) => (
                  <ListItem button key={_locale._id}>
                    <ListItemText style={{textAlign:'center'}} primary={_locale.name} onClick={() => getTranslations(_locale)} />
                  </ListItem>
                )
              )
            }
            </List>
          </div>
        </Drawer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (localeId) => dispatch(getTranslations(localeId)),
    toggleDrawer: () => dispatch({type:TOGGLE_LOCALIZATION_BAR})
  }
}

const mapStateToProps = (state) => {

  const {barOpened,locales,locale} = state.locale
  return {barOpened,locales,locale}

}

export default connect(mapStateToProps,mapDispatchToProps)(LanguageSelectionDrawer);
