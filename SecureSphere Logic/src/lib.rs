use calimero_sdk::borsh::{BorshDeserialize, BorshSerialize};
use calimero_sdk::serde::Serialize;
use calimero_sdk::{app, env};

#[app::state(emits = for<'a> Event<'a>)]
#[derive(BorshDeserialize, BorshSerialize, Default)]
#[borsh(crate = "calimero_sdk::borsh")]
pub struct ContentShare {
    all_content: Vec<Content>,  // Renamed to `all_content` for consistency
}

#[derive(BorshDeserialize, BorshSerialize, Default, Serialize)]
#[borsh(crate = "calimero_sdk::borsh")]
#[serde(crate = "calimero_sdk::serde")]
pub struct Content {
    username: String,  // The user's name
    content: String,   // The content they posted
}

#[app::event]
pub enum Event<'a> {
    ContentCreated {
        username: &'a str,
        content: &'a str,
    },
}

#[app::logic]
impl ContentShare {
    #[app::init]
    pub fn init() -> ContentShare {
        ContentShare::default()  // Initialize with an empty list
    }

    // This function retrieves the full list of entries (all posts)
    pub fn get_all_entries(&self) -> &[Content] {
        env::log("Getting all content entries.");
        &self.all_content  // Access the renamed list `all_content`
    }

    // This function allows a new content entry to be added with username and content
    pub fn create_content(&mut self, username: String, content: String) -> &Content {
        env::log(&format!("Creating content for user: {:?} with content: {:?}", username, content));

        app::emit!(Event::ContentCreated {
            username: &username,
            content: &content,
        });

        // Add the new entry to the list
        self.all_content.push(Content {
            username,
            content,
        });

        match self.all_content.last() {
            Some(entry) => entry,
            None => env::unreachable(),  // Can be handled more gracefully if desired
        }
    }
}
