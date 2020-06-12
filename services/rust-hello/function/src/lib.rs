#[macro_use]
extern crate serde_json;
use warp::{Filter, filters::BoxedFilter, Reply};

pub fn main() -> BoxedFilter<(impl Reply,)> {
  // POST /hola => 200 OK with body
  warp::post()
    .and(warp::header("user-agent"))
    .map(|agent: String| {
      let message = format!("Hola hasura!!!! whose agent is {}", agent);
      json!({"message": message}).to_string()
    })
    .boxed()
}