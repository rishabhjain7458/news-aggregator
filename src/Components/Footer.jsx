import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <>
    <div class="d-flex flex-column h-100">

<footer class="w-100 py-4 flex-shrink-0 mt-5"  style={{backgroundColor: "#F5CC75"}}>
    <div class="container py-4">
        <div class="row gy-4 gx-5">
            <div class="col-lg-4 col-md-6">
                <h5 class="h1 text-black">About Us</h5>
                <p class="small text-black">Whether you're looking for breaking news, in-depth analysis, or human-interest stories, you can rely on us to provide you with timely and reliable updates. Thank you for trusting us as your source for news.</p>
                <p class="small text-black mb-0">&copy; Copyrights. All rights reserved. <a class="text-primary" href="#">NewsNow.com</a></p>
            </div>
            <div class="col-lg-2 col-md-6">
                <h5 class="text-black mb-3">Quick links</h5>
                <ul class="list-unstyled text-black">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Get started</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-6">
                <h5 class="text-black mb-3">Quick links</h5>
                <ul class="list-unstyled text-black">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Get started</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-6">
                <h5 class="text-black mb-3">Newsletter</h5>
                <p class="small text-black">Enter Your Email address to sign up for our daily newsletter for free!</p>
                <form action="#">
                    <div class="input-group mb-3 text-white">
                        <input class="form-control text-white" type="email" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button class="btn btn-primary text-white" id="button-addon2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</footer>




<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Your response has been recorded.</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Daily newsletters will be sent to your mail.
      </div>
      
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default Footer