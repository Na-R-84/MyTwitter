import { makeStyles } from '@material-ui/styles';

const UseStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#00334d',
    width: '25%',
    padding: '1.5rem 2rem',
  },
  profileText: {
    marginRight: '1rem',
    width: 'max-content',
    direction: 'rtl',
  },
  tweeterNameParent: {
    marginRight: '0.5rem',
    width: 'max-content',
  },
  profileName: {
    flex: 1,
    color:'#557591'
  },
  profileId: {
    flex: 1,
    color: '#6e8eaa',
    fontSize: '0.78rem',
  },
  tweeterRoot: {
    background: '#aac3d4',
    marginTop: '3rem',
    borderRadius: '2.5rem',
    padding: '11px 24px',
  },
  tweeterTitle: {
    fontSize: '1.1rem !important',
    fontWeight: '600 !important',
    marginBottom: '11px',
    textAlign:'center',
    color:'#00334d'
    
  },
  tweeterParent: {
    padding: '10px 0',
  },
  menu: {
    backgroundColor: '#00334d',
    padding: '1rem',
  },
  tweeterImg: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    marginRight:'1rem'
  },
}));

export default UseStyles;
