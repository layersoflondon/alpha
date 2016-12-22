class SideBar extends React.Component {
  render () {
    return (
        <div className="m-sidebar">
		        <NavigationMenu menu={this.props.menu} />
		        <SearchTab />
            <OverlayResultsContainer />
        </div>
    );
  }
}
