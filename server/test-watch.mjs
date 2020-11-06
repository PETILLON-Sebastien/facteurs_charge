import fs from 'fs';

fs.watch('C:/Users/Ben/Code/facteurs_charge_client/watchme', {persistent:true,recursive:true, encoding:'utf8'}, (e, f) => {
    console.log(e, f);
});