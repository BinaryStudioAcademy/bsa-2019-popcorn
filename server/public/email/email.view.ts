const btnLinkHtml = (href, text) => `
	<a
		style='
			display: inline-block;
			box-sizing: border-box;
			padding: 10px 20px;  
			border-radius: 4px;
			outline: none;
			background-color: #ff6501;
			text-align: center;
			letter-spacing: 0.4px;
			line-height: 22px;
			font-size: 18px;
			font-weight: 600;
			text-decoration: none;
			color: #fff;
		'
		href='${href}'
	>
		${text}
	</a>
`;

export const confirmEmailChange = (token, confirmUrl) => {
  return `
		<div
			style='
				text-align: center;	
			'
		>
			<p
				style='
					font-size: 16px;
					color: #000;
				'
			>
				You requested for a email change, please click the button to confirm it.
			</p>
			${btnLinkHtml(confirmUrl(token), "Confirm")}
		</div>
	`;
};

export const confirmPasswordChange = (token, confirmUrl) => {
  return `
		<div
			style='
				text-align: center;	
			'
		>
			<p
				style='
					font-size: 16px;
					color: #000;
				'
			>
				You requested for a password change, please click the button to confirm it.
			</p>
			${btnLinkHtml(confirmUrl(token), "Confirm")}
		</div>
	`;
};

export const welcome = () => {
  return `
		<div
			style='
				width: 40%;
				margin: 0 auto;
			'  
		>
			<header
				style='
					padding: 10px 5px;
					box-sizing: border-box;
					border-top: 4px solid silver;
					border-bottom: 4px solid silver;
				'
			>
				<a
					href=${process.env.FRONTEND_HOST}
					style='
						display: block;
						text-align: center;
						text-decoration: none;
						color: #000;
					'
				>
					<img
						src='${process.env.API_URL}/email/popcorn-logo.png'
						alt='popcorn-logo'
						style='
							width: 50px;
							height: auto;
							vertical-align: middle;
						'
					/>
					<span
						style='
							display: inline-block;
							vertical-align: middle;
							margin-left: 5px;
							font-size: 1.5em;
							font-weight: bold;
						'>
					Pop Corn</span>
				</a>
			</header>
			
			<main
				style='
					font-size: 16px;
				'
			>
				<h1
					style='
						color: #000;
						text-align: center;
					'
				>Welcome to Pop Corn!</h1>
				<p
					style='
						font-size: 16px;
						color: #000;
					'
				>
					Please, go to <a href='${
            process.env.FRONTEND_HOST
          }'>link</a> for confirm registration.
				</p>

				<p
					style='
						font-size: 16px;
						color: #000;
					'
				>You might be interested in:</p>
				<ul
					style='
						font-size: 16px;
						color: #000;
						cursor: pointer;
					'
				>
					<li><a href='${process.env.FRONTEND_HOST}/tops'>Tops</a></li>
					<li><a href='${process.env.FRONTEND_HOST}/events'>Events</a></li>
					<li><a href='${process.env.FRONTEND_HOST}/surveys'>Surveys</a></li>
				</ul>

				<div
					style='
						text-align: center;	
					'
				>
					${btnLinkHtml(process.env.FRONTEND_HOST, "Let's go")}
				</div>
			</main>
			
			<footer
				style='
					font-size: 14px;
					color: #000;
				'
			>
				<p>The Pop Corn Team</p>
			</footer>
		</div>
	`;
};
