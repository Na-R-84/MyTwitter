import { makeStyles } from '@material-ui/styles';

const UseStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    width: '25%',
    padding: '1.5rem 2rem',
  },
  profileText: {
    marginLeft: '0.5rem',
    width: 'max-content',
    direction: 'ltr',
  },
  tweeterNameParent: {
    marginRight: '0.5rem',
    width: 'max-content',
  },
  profileName: {
    flex: 1,
  },
  profileId: {
    flex: 1,
    color: theme.palette.text.hint,
    fontSize: '0.78rem',
  },
  tweeterRoot: {
    background: '#f5f8fa',
    marginTop: '3rem',
    borderRadius: '2.5rem',
    padding: '11px 24px',
  },
  tweeterTitle: {
    fontSize: '1.1rem !important',
    fontWeight: '600 !important',
    marginBottom: '11px',
  },
  tweeterParent: {
    padding: '10px 0',
  },
  menu: {
    backgroundColor: 'white',
    padding: '1rem',
  },
  tweeterImg: {
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
}));

export default UseStyles;
