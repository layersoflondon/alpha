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

        <TabPanel>
          <SearchTab />
        </TabPanel>

        <TabPanel>
          <OverlaysTab />
        </TabPanel>

        <TabPanel>
          <CollectionsTab />
        </TabPanel>

      </Tabs>
    )
  }
}
