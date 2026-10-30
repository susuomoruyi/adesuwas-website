# Writing and publishing

## Publish a new essay

```
npm run new -- "Title of the essay"
```

That creates `blog/posts/<title>.md`. Open it, write your essay under the `---` line, and
fill in `description` (one sentence shown in lists). Pictures go in `images/blog/` and are
added with `![what it shows](images/blog/your-picture.jpg)`.

```
npm run publish
```

That rebuilds the blog, commits, and pushes to GitHub. The live site updates in about a minute.
(Or tell Claude "publish this essay" and paste it in.)

## Private stats

Stats come from GoatCounter, a free, cookie-free analytics service. Only you can see the dashboard.

1. Sign up at https://www.goatcounter.com and choose a code, e.g. `adesuwa`.
2. Put the code in `track.js` (`var GC = "adesuwa";`) and run `npm run publish`.
3. Open `https://adesuwa.goatcounter.com` and log in.

What you'll see:

- **Landed:** page views for each essay (the main list).
- **Read halfway / read to the end:** entries starting `read-50/` and `read-end/`, one per essay.
  "Read to the end" only counts when someone reaches the bottom after a plausible reading time.
- **Clicks:** entries starting `click/`, showing which links were clicked in each essay.
- **Where they came from:** the "Referrers" panel.

To keep your own visits out of the numbers, open any page of the site once with
`#toggle-goatcounter` at the end of the address.
