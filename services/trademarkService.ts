// services/trademarkService.ts
export async function fetchTrademarks(input_query: string, page: number = 1, status: string[] = []) {
  const response = await fetch(
    'https://vit-tm-task.api.trademarkia.app/api/v3/us',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
        'Referer': 'http://localhost:3000/',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        input_query,
        input_query_type: "",
        sort_by: "default",
        status, 
        exact_match: false,
        date_query: false,
        owners: [],
        attorneys: [],
        law_firms: [],
        mark_description_description: [],
        classes: [],
        page,
        rows: 10,
        sort_order: "desc",
        states: [],
        counties: []
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch trademarks: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

