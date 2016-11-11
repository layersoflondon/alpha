Short-term TODO list for the alpha development

* when adding a pin, we need to push the new marker/pin onto the array in SearchResultsStore
* Fix the rails associations so we can POST a pin and a content entry at the same time
* Refactor form so the user has to pick the content type they're creating (video / date / etc)
* Fix up the ajax calls to pass the csrf tags
* Add user authentication so a user has to be logged in to add a pin
* Hide the add pin form for non-logged inusers - use a prop on map container which we can fill from the serverside. (Assume the page will be reloaded if they're logged in anyway.)
* File uploading
* Hiding a pin modal - no way to get out of video at the moment.
* Work out how to render an overlay layer which doesn't cover the whole world, without getting 404s for all the 'missing' tiles
