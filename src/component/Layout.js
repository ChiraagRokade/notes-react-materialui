import { AppBar, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns'

const drawerWidth = 240;
const useStyles = makeStyles( ( theme ) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing( 3 ),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    active: {
      background: '#f4f4f4',
    },
    title: {
      padding: theme.spacing( 2 ),
    },
    appBar: {
      width: `calc(100% - ${ drawerWidth }px)`,
      marginLeft: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1
    },
    avatar: {
      marginLeft: theme.spacing( 2 )
    }
  }
} );

const Layout = ( { children } ) => {
  const classes = useStyles();
  const history = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/'
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: '/CreateNotes'
    }
  ]

  return (
    <div className={ classes.root }>
      {/* app bar */ }
      <AppBar
        className={ classes.appBar }
        elevatio={ 0 }
      >
        <Toolbar>
          <Typography className={ classes.date }>
            Today is the { format( new Date(), 'MMMM do Y' ) }
          </Typography>
          <Typography className={ classes.user }>
            Chiraag
          </Typography>
          <Avatar src="/mario-av.png" className={ classes.avatar } />
        </Toolbar>
      </AppBar>

      {/* side bar */ }
      <Drawer
        className={ classes.drawer }
        variant="permanent"
        anchor="left"
        classes={ { paper: classes.drawerPaper } }
      >
        <div>
          <Typography variant="h5" className={ classes.title }>
            Chiraag
          </Typography>
        </div>

        <List>
          { menuItems.map( item => (
            <ListItem
              button
              key={ item.text }
              onClick={ () => history( item.path ) }
              className={ location.pathname === item.path ? classes.active : null }
            >
              <ListItemIcon>{ item.icon }</ListItemIcon>
              <ListItemText primary={ item.text } />
            </ListItem>
          ) ) }

          {/* <ListItem>
            <ListItemText primary="hello" />
          </ListItem>
          <ListItem>
            <ListItemText primary="hello" />
          </ListItem> */}
        </List>

      </Drawer>
      <div className={ classes.page }>
        <div className={ classes.toolbar }></div>
        { children }
      </div>
    </div>
  );
}

export default Layout;