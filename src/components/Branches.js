import React from 'react';
import axios from 'axios';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import './Header.css';

function Branches() {
    const [fav, setFav] = React.useState(false);

    const [banks, setBanks] = React.useState([]);

    React.useEffect(() => {
      axios.get('https://obscure-inlet-83084.herokuapp.com/')
      .then (response => {
       console.log(response.data);
       setBanks(response.data)})
      .catch(err => console.log(err));
      return () => setBanks([]);
    },
    [])

    const favHandleChange = (event) => {
        setFav(event.target.checked);
      };
      const newBank = [];
      const uniBank = [];
      banks.forEach(obj => {
          var eleString = JSON.stringify(obj.bank_name);
          if (!newBank.includes(eleString)) {
            uniBank.push(obj);
            newBank.push(eleString);
          }
        });
    return (                
                  <div>
                {uniBank.map((bank, index) => (
                   <div className="bank-box" key={index+1}>
                    <h3>{bank.bank_name} <span>
                    <FormControlLabel
                        
                        checked={fav}
                        onChange={favHandleChange}
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="favourite" />}
                        color="primary"
                />
                    </span></h3>
                    <p>Bank ID: {bank.id}</p>
                </div>       
                ))}
        </div>     
    )
}

export default Branches
