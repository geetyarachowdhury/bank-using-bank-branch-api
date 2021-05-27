// eslint-disable-next-line
import React from 'react';
import axios from 'axios';
import { makeStyles,  TextField } from '@material-ui/core';
import './Header.css';
import Branches from './Branches'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Headers() {
    const classes = useStyles();
    const [city, setCity] = React.useState([]);
    const [branches, setBranches] = React.useState([]);
    const [search, setSearch] = React.useState({
      "q": ""
    });
    const [filteredBranches, setFilteredBranches] = React.useState([]);
    const [limit, setLimit] = React.useState({
        "l" : 4
    });
    const [offset, setOffset] = React.useState({
      "o": 0
    });
    

    React.useEffect(() => {
        axios.get("https://obscure-inlet-83084.herokuapp.com/")
        .then (response => {
         console.log(response.data);
         setCity(response.data)})
        .catch(err => console.log(err));
      }, [])
  
    const handleChange = (event) => {
      setCity(event.target.value);
    };

    React.useEffect(() => {
      axios
        .get(`https://obscure-inlet-83084.herokuapp.com/api/branches?q=${encodeURIComponent(search.q)}&page=${encodeURIComponent(limit.l)}&offset=${encodeURIComponent(offset.o)}`)
        .then((res) => {
          setBranches(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [search, limit, offset]);

    React.useEffect(() => {
      setFilteredBranches(
        branches.filter((branch) =>
          branch.ifsc.toLowerCase().includes(search.q.toLowerCase()) ||
          branch.branch.toLowerCase().includes(search.q.toLowerCase()) ||
          branch.address.toLowerCase().includes(search.q.toLowerCase()) ||
          branch.city.toLowerCase().includes(search.q.toLowerCase()) ||
          branch.district.toLowerCase().includes(search.q.toLowerCase()) ||
          branch.state.toLowerCase().includes(search.q.toLowerCase()) ||
          branch.bank_name.toLowerCase().includes(search.q.toLowerCase())
        )
      );
    }, [search, branches]);

  
    const updateChange = (event) => {
      const s = event.target.value;
      setSearch({
        "q" : s
      });
    }

    console.log("branches: ", branches)
    console.log("search: ", search.q)
    console.log("filtered: ", filteredBranches)
    // const handleSearchChange = (e) => {
    //     setSearch(e.targe.value)
    // }
    const newArray = [];
    const uniArray = [];
    
    city.forEach((obj) => {
        var eleString = JSON.stringify(obj.city);
        if (!newArray.includes(eleString)) {
          uniArray.push(obj.city);
          newArray.push(eleString);
        }
      });
      const uniCity = uniArray.slice(0,5);
      const pageFun = (e) => {
        setLimit({"l": e.target.value})
      }

      const offsetFun = (e) => {
        setOffset({"o": e.target.value})
      }
      console.log(limit.l)
      console.log(offset.o)
    console.log("unicode:", uniCity)
      return (
          <div className="app_header">
  
          {/* dropdown city */}
              <div className="app_city">
              
              <select className="city-options" id="cities" value="Mumbai" onChange={handleChange} label="City">
              {uniCity.map((c, i)=> (
            <option value="Mumbai" key={i+1}>{c}</option>
            ))
    }
        </select>
       
              </div>
  
              {/* search bar */}
              <div className="app_search">
              <React.Fragment>
              <TextField
              key={Math.random()}
            label="Search"
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={updateChange}
            value={search.q}
          />
          </React.Fragment>
          
              </div> 
              <div className="page-set">
            <TextField
          label="Page"
          className="pl"
          id="outlined-size-small1"
          style= {{width: "20%"}}
          value={limit.l}
          variant="outlined"
          size="small"
          onChange={pageFun}
        />
        <TextField
          label="Offset"
          className="po"
          style= {{width: "20%", marginLeft: "15px"}}
          id="outlined-size-small"
          value={offset.o}
          variant="outlined"
          size="small"
          onChange={offsetFun}
        />
          </div>
          <div className="details">
           
        {search.q === "" ? <Branches /> : filteredBranches.map((b, idx)=> (
          <BanchesDetail key={idx} 
          bank_name={b.bank_name}
          ifsc={b.ifsc}
          bank_id={b.bank_id}
          branch={b.branch}
          address={b.address}
          city={b.city}
          district={b.district}
          state={b.state} />
        ))}
          </div>
      </div>    
    )
}
const BanchesDetail = (props) => {
  const { ifsc, bank_id, branch, address, city, district, state, bank_name } = props;

  return (
    <div className="bank-box ">
      <h3><b>Bank Name :</b> {bank_name}</h3>
      <p><b>Bank ID :</b> {bank_id}</p>
      <p><b>IFSC :</b> {ifsc}</p>
      <p><b>Branch :</b> {branch}</p>
      <p><b>Address :</b> {address}</p>
      <p><b>City :</b> {city}</p>
      <p><b>District :</b> {district}</p>
      <p><b>State :</b> {state}</p>
    </div>
  );
};

export default Headers
