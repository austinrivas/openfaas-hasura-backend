use warp;

use handler;

#[tokio::main]
async fn main() {
    warp::serve(handler::handle())
      .run(([127, 0, 0, 1], 3000))
      .await;
}