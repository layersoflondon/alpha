var Tabs     = ReactTabs.Tabs,
    Tab      = ReactTabs.Tab,
    TabList  = ReactTabs.TabList,
    TabPanel = ReactTabs.TabPanel;

class FilterTabs extends React.Component {
  render () {
    return (
      <Tabs selectedIndex={0} className="m-panels">
        <TabList className="tabs">
          <Tab><a href="#">Search</a></Tab>
          <Tab><a href="#">Overlays</a></Tab>
          <Tab><a href="#">Collections</a></Tab>
        </TabList>

        <TabPanel className="m-search-panel">
          <SearchTab />
        </TabPanel>

        <TabPanel className="m-overlays-list">
          <OverlaysTab />
        </TabPanel>

        <TabPanel className="m-collections-panel">
          <CollectionsTab />
        </TabPanel>

      </Tabs>
    )
  }
}
