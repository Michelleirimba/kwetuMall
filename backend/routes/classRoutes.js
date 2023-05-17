import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    const name= {
        first: 'Jane',
        last: 'Doe'
    }
    res.send(name);
});

router.get('/math', (req, res)=>{
    let math = 60;
    let eng = 70;
    let avg = (math +eng)/2
    let total ={
        avg: avg,
        message: 'Average of Math ang English marks'
    }
    res.send(total)
})

router.get('/people', (req, res)=>{
    const people=[ 
        {Name:'Jane Doe', Age:'27', Occupation: 'Teacher'},
        {Name:'John Doe', Age:'30', Occupation: 'Driver',},
        {Name:'Harry Doe', Age:'30', Occupation: 'Farmer'}
    ]   
    res.send(people)
})

router.post('/average/percantage', (req, res)=>{
    console.log(req.body)
    const math= req.body.math/70*100
    const eng= req.body.eng/70*100
    const phy= req.body.phy/70*100
    const swa= req.body.swa/70*100
    const geo= req.body.geo/70*100

    const avg=Math.floor( (math+ eng+ phy+ swa+ geo)/5) +"%"

    res.send(avg)
})

router.post('/sum', (req, res)=>{
    console.log(req.body)

    const sum = req.body.reduce((a,b)=>{
        return (a+b)
    })

    const total= {
        sum: sum
    }
    res.send(total)
})

export default router;