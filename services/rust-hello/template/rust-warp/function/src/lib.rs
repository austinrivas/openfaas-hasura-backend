use warp::{Filter, filters::BoxedFilter, Reply};

pub fn handle() -> BoxedFilter<(impl Reply,)> {
  // GET /hello/warp => 200 OK with body "Hello, warp!"
  warp::path!("hello" / String)
    .map(|name| format!("Hello, {}!", name))
    .boxed()
}