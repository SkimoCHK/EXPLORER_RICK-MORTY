interface HttpClientOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export const httpClient = async <T>(
  url: string,
  options: HttpClientOptions = {},
): Promise<T> => {
  const { params, ...fetchOptions } = options;

  let finalUrl = url;

  if (params) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, String(value));
      }
    });

    finalUrl += `?${query.toString()}`;
  }

  const response = await fetch(finalUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};
