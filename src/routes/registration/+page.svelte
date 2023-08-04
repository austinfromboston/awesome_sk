<script lang="ts">
  import type { RegAdult, RegChild } from "src/models/people"
  const event_year = 2023
  const valid_coupon_code = ""
  const cash_customer = false
  let selected_adult_price = 150
  let selected_kid_price = selected_adult_price
  let allowed_prices = [ 25, 50, 100, 150, 200, 250 ]
  let extraAdults: RegAdult[] = []
  let kids: RegChild[] = []
  let total = 0
  $: total = ((extraAdults.length + 1) * selected_adult_price) + (kids.length * selected_kid_price)

  // function submitForm() {
  //   window.confirm("Feels good man")
  // }

  function addAdult() {
    extraAdults.push({name: "", email: ""})
    extraAdults = extraAdults
  }

  function addKid() {
    kids.push({name: "", age: ""})
    kids = kids
  }

  function removeAdult(idx: number) {
    return () => {
      extraAdults.splice(idx, 1)
      extraAdults = extraAdults
    }
  }

  function removeKid(idx: number) {
    return () => {
      kids.splice(idx, 1)
      kids = kids
    }
  }
</script>

<div class="col-md-2">
</div>
<div class="col-md-8 scrim">
  <h1>Register for Awesome {event_year}</h1>


  <h3>Sliding Scale Pricing</h3>
  {#if valid_coupon_code }
    <strong>GOT IT! The {valid_coupon_code} price is ${selected_adult_price}.00</strong>
  {:else}
    <div class="form-group">
      Standard Registration for Awesome {event_year} is <strong>$150</strong>. 
      This covers costs for site rental, van rental, supplies... so, if this is workable for you, we sure appreciate it.  
      We are charged full price by the venue for all children over 5 so this year we ask that you buy tickets for all children over 5 but feel free to use the sliding scale if money is an issue.
      Awesome is not a profit-taking event and we are doing our best to bring you the awesome at-cost!
    </div>
  {/if}
  <form method="POST">
      <h3>Tell us about yourself</h3>
      <div>
        <label>Name<input type="text" name="purchaser_name"/></label>
      </div>
      <div>
        <label>Email<input type="text" name="purchaser_email"/></label>
      </div>
      <div>
        <label>Phone Number<input type="text" name="purchaser_phone"/></label>
      </div>
      <div>
        {#if cash_customer}
          <span class="cash_price">
              PAY IN CASH
          </span>
        {:else}
          <label>
            Select your sliding scale price
            <select name="adult_price">
              {#each allowed_prices as price}
              <option value="{price * 100}" selected={selected_adult_price==price}>${price}.00</option>
              {/each}
            </select>
          </label>
        {/if}
      </div>
      <h3>Anyone else coming with you?</h3>
      {#each extraAdults as adult, idx}
        <div>
          <button type="button" on:click={removeAdult(idx)}>Remove</button>
          <label>Name<input type="text" name={`adult_name_${idx}`} value={adult.name}/></label>
          <label>Email<input type="text" name={`adult_email_${idx}`} value={adult.email}/></label>
        </div>
      {/each}
      <button type="button" on:click={addAdult}>Add Adult</button>
      {#each kids as kid, idx}
        <div>
          <button type="button" on:click={removeKid(idx)}>Remove</button>
          <label>Name<input type="text" name={`kid_name_${idx}`} value={kid.name}/></label>
          <label>Age<input type="text" name={`kid_age_${idx}`} value={kid.age}/></label>
        </div>
      {/each}
      {#if !cash_customer && kids.length > 0}
        <div>
          <label>
            Select a sliding scale kids price
            <select name="kid_price">
              {#each allowed_prices as price}
              <option value="{price * 100}" selected={selected_kid_price == price}>${price}.00</option>
              {/each}
            </select>
          </label>
        </div>  
      {/if}
      <button type="button" on:click={addKid}>Add Kid</button>
      <h3>Your total: ${total}.00</h3>
      <h3>Okay, on with the details</h3>
      <div>
        <label>When do you expect to show up?
          <select name="arrival_time">
            <option value="Wednesday">Wednesday night</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </label>
      </div>
      <p>
      Here is a <a href="https://drive.google.com/file/d/1hnjx42z-pznlx0KI4KdACoHrHhBYScdE/view?usp=sharing">cabin map</a>, tell us a couple cabin numbers you might prefer and we will try to do advance assignment.
      </p>
      <div>
        <label>
          Each cabin holds 4 people. 
          We will put you with the group you are registering or any requested cabin mates.  
          We often do not have enough cabins for every individual to have their own -- we will be in touch about camping or podding options. Save time, give us cabin assignment requests below 
          <textarea name="cabin_preferences"></textarea>
        </label>
      </div>
      <div>
        <label>
          Will you bring some Awesome? This is an event where we all do awesome stuff, is there some specific awesome you want to bring to the community? 
          <textarea name="awesome_contributions"></textarea>
        </label>
      </div>
      <p>
        Here is the <a href="https://docs.google.com/document/d/1SqiBXIUD3V-kIq43HkBHqfmuPI6aoTVak4EW1b3xMvY/edit?usp=sharing">Awesome Covid Policy</a> 
      </p>
      <div>
        <label>
          Anything else you want us to know? Special requests, allergies, grammar faux pas 
          <textarea name="other_comments"></textarea>
        </label>
      </div>
      <button type="submit">Register</button>
  </form>
</div>
