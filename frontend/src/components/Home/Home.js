import React,{ useEffect , useState} from 'react'
import { Container,Grow, Grid ,Paper , AppBar , Button,TextField} from '@material-ui/core';
import  {useDispatch } from 'react-redux';
import {getPosts ,getPostsBySearch } from '../../actions/posts.js';
import  {useNavigate , useLocation} from 'react-router-dom';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import Pagination from '../Pagination.jsx';
import ChipInput from 'material-ui-chip-input';
import useStyles from  './styles.js';


function useQuery(){
   return new URLSearchParams(useLocation().search);
}


const Home = () => {
 
    const dispatch = useDispatch();
    const[currentId , setCurrentId] = useState(null);
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const serachQuery = query.get('searchQuery');
    const classes = useStyles();
    const[search , setSearch] = useState('');
    const[tags , setTags] = useState([]);

    const searchPost = () =>{
      if(search.trim() || tags){
         dispatch(getPostsBySearch({search , tags:tags.join(',') }));
         navigate(`/posts/search?searchQuery=${search || 'none'}&tags = ${tags.join(',')}`);

      }else{
         navigate('/');
      }
    }
    const handleKeyPress = (e) =>{
      if(e.keyCode === 13){
         searchPost();
      }
    }
    const handleAddChip = (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  return (
    <Grow in>
        <Container maxWidth = 'xl'>
          <Grid  container justifyContent = "space-between" alignItems= "stretch" spacing={3}  className= {classes.gridContainer}>
             <Grid item xs = {12} sm = {6} md = {9}>
                <Posts setCurrentId={setCurrentId}/>
             </Grid>
             <Grid item xs = {12} sm = {6} md = {3}>
             <AppBar className={classes.appBarSearch} position="static" color='inherit'>
                <TextField name = "search" variant='outlined' label = "Search Memories" fullWidth value = {search} 
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value) }/>
                <ChipInput
                  style = {{margin:'10px 0'}}
                  value = {tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label = "Search Tags"
                  variant='outlined'
                />
                <Button onClick = {searchPost} className={classes.searchButton} variant = "contained" color='primary'>Search</Button>
             </AppBar>
                <Form currentId = {currentId} setCurrentId={setCurrentId}/>
                {(!serachQuery && !tags.length) && (
                  <Paper elevation={6} className= {classes.pagination}>
                  <Pagination page={page}/>
                </Paper>
                )}
             </Grid>
          </Grid>       
        </Container>
     </Grow>
  )
}

export default Home
