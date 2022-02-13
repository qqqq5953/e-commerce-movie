<template>
  <div class="container py-3">
    <header>
      <h1 class="display-3 fw-normal p-3 pb-md-3 text-center">Pricing</h1>
    </header>

    <main>
      <div class="row row-cols-1 row-cols-md-3 mb-5 text-center">
        <!-- FREE -->
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm h-100">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">Free</h4>
            </div>
            <div class="card-body d-flex flex-column">
              <h1 class="card-title pricing-card-title">
                NT$0<small class="text-muted fw-light">/month</small>
              </h1>
              <ul class="mt-3 mb-4 text-start">
                <li class="mb-3">
                  Unlimited access to details of Movies, TV shows and People
                  related to the content
                </li>
                <li class="mb-3">10 quotas for Watchlist</li>
                <li>10 quotas for My Favorite</li>
              </ul>
              <button
                type="button"
                class="w-100 btn btn-outline-primary mt-auto mb-2"
              >
                Sign up for free
              </button>
            </div>
          </div>
        </div>
        <!-- PURCHASE -->
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm h-100">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">PURCHASE</h4>
            </div>
            <div class="card-body d-flex flex-column">
              <h1 class="card-title pricing-card-title">
                NT$450<small class="text-muted fw-light">/disc</small>
              </h1>
              <ul class="mt-3 mb-4 text-start">
                <li class="mb-3">
                  Unlimited access to details of Movies, TV shows and People
                  related to the content
                </li>
                <li class="mb-3">50 quotas for Watchlist</li>
                <li class="mb-3">50 quotas for My Favorite</li>
                <li class="mb-3">
                  Access to purchased Movies / TV shows with
                  <strong>HD quality</strong>
                </li>
                <li>Access to rating the purchased Movies / TV shows</li>
                <li>Watch on 1 screen only</li>
              </ul>
              <button
                type="button"
                class="w-100 btn btn-outline-primary mt-auto mb-2"
              >
                Pick a movie / tv show
              </button>
            </div>
          </div>
        </div>
        <!-- SUBSCRIPTION -->
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm border-primary h-100">
            <div class="card-header py-3 bg-primary border-primary">
              <h4 class="my-0 fw-normal text-white">SUBSCRIPTION</h4>
            </div>
            <div class="card-body d-flex flex-column">
              <h1 class="card-title pricing-card-title">
                NT$330<small class="text-muted fw-light">/month</small>
              </h1>
              <ul class="mt-3 mb-4 text-start">
                <li class="mb-3">
                  Unlimited access to details of Movies, TV shows and People
                  related to the content
                </li>
                <li class="mb-3">50 quotas for Watchlist</li>
                <li class="mb-3">50 quotas for My Favorite</li>
                <li class="mb-3">
                  Unlimited access to
                  <strong class="fw-bold">ALL</strong> Movies / TV shows with
                  <strong class="fw-bold">4K</strong> quality
                </li>
                <li class="mb-3">
                  Unlimited access to rating
                  <strong class="fw-bold">ALL</strong>
                  Movies, TV shows and People
                </li>
                <li>
                  Watch on <strong class="fw-bold">2</strong> screens at the
                  same time
                </li>
                <li>
                  Receive occasional promotions up to
                  <strong class="fw-bold">20% DISCOUNT</strong>
                </li>
              </ul>
              <button type="button" class="w-100 btn btn-primary mt-auto mb-2">
                SUBSCRIBE NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 class="display-6 text-center mb-4">Compare plans</h2>

      <div class="table-responsive">
        <table class="table text-center align-middle">
          <thead>
            <tr>
              <th style="width: 34%"></th>
              <th style="width: 22%">Free</th>
              <th style="width: 22%">PURCHASE</th>
              <th style="width: 22%">SUBSCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="text-start">Content Details</th>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start">Watchlist</th>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start">My Favorite</th>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th scope="row" class="text-start">Quality</th>
              <td></td>
              <td>HD</td>
              <td>4K</td>
            </tr>
            <tr>
              <th scope="row" class="text-start">Rating</th>
              <td></td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
                <div>(Limited)</div>
              </td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
                <div>(Unlimited)</div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start">Discount</th>
              <td></td>
              <td></td>
              <td>
                <i class="bi bi-check2 fs-4"></i>
                <div>(Up to 20%)</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
