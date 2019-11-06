import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiInput: {
      formControl: {
        'label + &': {
          marginTop: '0px'
        }
      }
    },
    
    MuiInputLabel: {
      // Name of the rule
      root: {
          textAlign:'center',
          width:'100%'
      },
      shrink: {
          transform: 'translate(0, 1.5px) scale(1)',
          transformOrigin: 'top left',
          textAlign:'center'
      },
      formControl: {
        position:'static'
      }
    },
    MuiFormControlLabel: {
      root: {
        marginLeft: '0px',
        marginRight: '0px'
      }
    },
    MuiTab: {
      root: {
        '@media (min-width: 960px)':{
            fontSize: '0.8125rem',
            minWidth: '0px'
        }
      }
    }
  },
  typography: { useNextVariants: true },
});