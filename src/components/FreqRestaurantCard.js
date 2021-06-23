import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  Button
} from '@material-ui/core'
import imageList from '../data/imageList'

const useStyles = makeStyles((theme) => ({
  card : {
    width : "96%",
    marginRight : "0.7rem",
    marginBottom : "0.2rem",
    position: 'relative'
  },
  cardImg : {
    height : "200px"
  }
}))

function FreqRestaurantCard({data,ind,ribbon}) {

  const classes = useStyles()

  return (
    <Card variant="outlined" classes={{root : classes.card}} className="fade-in">
      <CardMedia
        className={classes.cardImg}
        component="img"
        image={imageList[ind]}
        title="Restaurant Pic"
      />
      {ribbon && <div class="ribbon"><span>NEW</span></div>}
      <CardContent>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="subtitle2" gutterBottom>{data.name}</Typography>
            <Typography variant="caption">{data.address}</Typography> 
          </Grid>
            <Grid item xs={4}>
              <Button color="secondary">RE-ORDER</Button>
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  )
}

export default React.memo((props) => <FreqRestaurantCard {...props}/>)
