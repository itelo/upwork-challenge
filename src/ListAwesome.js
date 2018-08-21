import React from "react";
import { List, AutoSizer } from "react-virtualized";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const marginHorizontal = 16;
const marginVertical = 12;

const styles = theme => ({
  listContainer: {
    padding: `${marginVertical}px ${marginHorizontal}px`
  },
  cardContainer: {
    padding: marginHorizontal
  },
  backgroundColor: {
    backgroundColor: "#33c9dc"
  }
});

class ListAwesome extends React.Component {
  state ={ elevation: 0} 
  handleElevationChange = (elevation) => {
    const currentElevation = this.state.elevation
    if (currentElevation !== elevation) {
      this.setState({elevation})
    }
  }
  handleScroll = event => {
    if (event.scrollTop >= marginVertical) {
      this.handleElevationChange(2)
    } else {
      this.handleElevationChange(0)
    }
  }
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {
    const { classes, list } = this.props;
    const row = list.get(index);

    return (
      <div
        key={key}
        style={{ ...style, width: `calc(100vw - ${2 * marginHorizontal}px)` }}
        className={classes.rowContainer}
        onClick={() => alert(row.idDrink)}
      >
        <Paper elevation={1} style={{ height: style.height - marginVertical }}>
          <Grid
            direction="row"
            container
            style={{ height: style.height - marginVertical }}
            className={classes.cardContainer}
          >
            <Grid item>
              <img
                src={row.strDrinkThumb}
                style={{
                  height:
                    style.height - (marginHorizontal * 2 + marginVertical),
                  width: style.height - (marginHorizontal * 2 + marginVertical),
                  borderRadius: 4
                }}
              />
            </Grid>
            <Grid
              item
              xs
              style={{
                padding: "0 12px"
              }}
            >
              <Grid container spacing={8} direction="column">
                <Grid item xs>
                  <Typography variant="title">{row.strDrink}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };
  render() {
    const {elevation}= this.state ;
    const { classes, list } = this.props;
    return (
      <div style={{ background: "#33c9dc", height: "100vh", width: "100vw" }}>
        <AppBar elevation={elevation} classes={{ root: classes.backgroundColor }}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              News
            </Typography>
          </Toolbar>
        </AppBar>
        <AutoSizer>
          {({ width, height }) => (
            <List
              onScroll={this.handleScroll}
              className={classes.listContainer}
              width={width}
              height={height}
              rowCount={list.size}
              rowHeight={132}
              rowRenderer={this.rowRenderer}
              style={{ marginTop: 56 }}
            /> 
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default withStyles(styles)(ListAwesome);
