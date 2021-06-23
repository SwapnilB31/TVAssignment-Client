import React from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    makeStyles
} from '@material-ui/core'
import {Star} from '@material-ui/icons'

import {RatingsSpan,RatingInfoDiv,FlexRowDiv,PriceTagSpan} from './CustomStyledComponents'
import MealTypeMarker from './MealTypeMarker'
import imageList from '../data/imageList'

const useStyles = makeStyles((theme) => ({
  cardImg : {
    height : "170px"
  }
}))

function RestaurantCard({data,ind}) {
  const classes = useStyles()

  return (
    <Card variant="outlined" className="fade-in">
        <CardMedia
          className={classes.cardImg}
          component="img"
          image={imageList[ind % 9]}
          title="Restaurant Pic"
        />
        <CardContent>
          <Typography variant="subtitle2">
              {data.name}
          </Typography>
          <FlexRowDiv>
            <PriceTagSpan>₹{data.price}/-</PriceTagSpan>
            <div style={{marginLeft : "0.3rem", color : "#888", fontSize : "0.8rem"}}>per head</div>
            <div style={{marginLeft : "0.3rem", color : "#888", fontSize : "0.8rem"}}>•</div>
            <div style={{marginLeft : "0.3rem", color : "#888", fontSize : "0.8rem"}}>10 dishes</div>
          </FlexRowDiv>
          <RatingInfoDiv>
            <div style={{display : "flex", flexDirection : "row", alignItems : "center"}}>
              <RatingsSpan rating={data.ratings}>
                <Star style={{fontSize : "0.9rem", marginRight : "0.1rem"}}/>
                {data.ratings.toPrecision(2)}
                </RatingsSpan>
                <div style={{marginLeft : "0.6rem", color : "#999", fontSize : "0.8rem"}}>{`${data.numRatings} Ratings`}</div>
            </div>
            <MealTypeMarker mealType={data.mealType}/>
          </RatingInfoDiv>
        </CardContent>
    </Card>
  )
}

export default React.memo(props => <RestaurantCard {...props}/>)