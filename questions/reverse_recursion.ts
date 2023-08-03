

function reverse(s: string): string {
	if (s.length === 1) return s;

	const right = reverse(s.slice(0, s.length - 1));

	const left = s[s.length - 1];

	return left + right;
}

console.log(reverse("hello"));
