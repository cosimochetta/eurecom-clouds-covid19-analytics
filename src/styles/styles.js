import {fade, makeStyles } from "@material-ui/core/styles";
import * as COLORS from "../constants/colors";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  countryTitle: {
    display: 'flex',
    justifyContent: 'center',
    padding: "8px 0px",
    backgroundColor: COLORS.COUNTRY,
  },
  grow: {
    flexGrow: 1
  }
}));

export const useTableStyles = makeStyles((theme) => ({
  root: {
    "& .country--cell": {
      backgroundColor: COLORS.COUNTRY,
      border: "2px solid white",
    },
    "& .confirmed--cell": {
      backgroundColor: COLORS.CONFIRMED,
      border: "2px solid white",
    },

    "& .recovered--cell": {
      backgroundColor: COLORS.RECOVERED,
      border: "2px solid white",
    },
    "& .deaths--cell": {
      backgroundColor: COLORS.DEATHS,
      border: "2px solid white",
    },
  },
}));

export const useNavigationStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    "&:hover": {
      color: 'black',
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));


export const useGridSlideStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListTile: {
    position: 'relative',
      float: 'left',
      minWidth: 250,
      height: '100% !important'
  }
}));

export const useCardStyles = makeStyles({
  root: {
    display: 'block',
  
    transitionDuration: '0.3s',
    height: 350,
    width: 250,
  },
  header: {
    height: 130,
    width: 250,
  },
  media: {
    height: 170,
    width: 250
  },
});