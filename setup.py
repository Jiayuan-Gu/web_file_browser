from setuptools import setup

setup(
    name='web_file_browser',
    version='0.1.0',
    author='Jiayuan Gu',
    author_email='jigu@ucsd.edu',
    packages=["web_file_browser"],
    package_dir={'web_file_browser': 'src'},
    include_package_data=True,
    package_data={
        'web_file_browser': ['static/**']
    },
    install_requires=[
        'Flask>=3.0.2',
    ],
    entry_points={
        'console_scripts': [
            'web_file_browser=web_file_browser.app:main',
        ],
    },
)
