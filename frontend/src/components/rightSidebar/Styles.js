import { makeStyles } from '@material-ui/styles';

const UseStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#00334d',
    width: '18%',
    padding: '1.5rem 1rem',
  },

  logoType: {
    fontSize: '1.50rem !important',
    fontWeight: '500 !important',
    marginLeft: '1rem',
    color: 'white',
  },
  Divider: {
    width: 1,
    backgroundColor: '#7EBAFF !important',
    filter: 'opacity(0.5)',
  },
  hashtagTitle: {
    fontSize: '1.1rem !important',
    fontWeight: '600 !important',
    marginTop: '3rem',
    marginBottom: '1.5rem',
  },

  hashtag: {
    marginRight: '0.8rem',
    color: 'white',
  },
  hashtagParent: {
    marginBottom: '0.5rem !important',
    padding: '0.15rem !important',
    width: '100%',
  },
}));

export default UseStyles;
